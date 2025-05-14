import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  question: yup.string().required('This field is required'),
});

const FormPage = () => {
  const webcamRef = useRef(null);
  const history = useHistory();
  const [aadharPhoto, setAadharPhoto] = useState(null);
  const [panPhoto, setPanPhoto] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const captureAadhar = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) setAadharPhoto(imageSrc);
  };

  const capturePan = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) setPanPhoto(imageSrc);
  };

  const onSubmit = async (data) => {
    if (!aadharPhoto || !panPhoto) {
      toast.error('Please capture both Aadhar and PAN photos.'); // Show error toast
      return;
    }

    setIsSubmitting(true); // Start loading
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('question', data.question);

      const aadharBlob = await fetch(aadharPhoto).then(res => res.blob());
      const panBlob = await fetch(panPhoto).then(res => res.blob());

      formData.append('aadharPhoto', aadharBlob, 'aadhar.jpg');
      formData.append('panPhoto', panBlob, 'pan.jpg');

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}form`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const responseBody = await response.json(); // Get response body if any
        toast.success('Form submitted successfully!'); // Show success toast
        console.log(responseBody); // You can inspect the response if needed
      } else {
        const errorResponse = await response.json();
        toast.error(`Failed to submit form: ${errorResponse.message || 'Unknown error'}`); // Show error toast
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error submitting form'); // Show error toast
    } finally {
      setIsSubmitting(false); // Stop loading
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-sm p-4 w-100" style={{ maxWidth: '500px' }}>
        <h1 className="text-center mb-4">Form</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('name')} placeholder="Name" className="form-control mb-2" />
          <input {...register('email')} placeholder="Email" className="form-control mb-2" />
          <input {...register('question')} placeholder="Question" className="form-control mb-2" />
          {errors.name?.message && <div className="text-danger">{errors.name.message}</div>}
          {errors.email?.message && <div className="text-danger">{errors.email.message}</div>}
          {errors.question?.message && <div className="text-danger">{errors.question.message}</div>}

          <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" width="100%" className="rounded border mb-2" />

          <button type="button" className="btn btn-outline-primary mb-2" onClick={captureAadhar}>
            📷 Capture Aadhar
          </button>
          {aadharPhoto && <img src={aadharPhoto} alt="Aadhar Preview" className="img-fluid rounded mb-2" />}

          <button type="button" className="btn btn-outline-success mb-2" onClick={capturePan}>
            📷 Capture PAN
          </button>
          {panPhoto && <img src={panPhoto} alt="PAN Preview" className="img-fluid rounded mb-2" />}

          <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'} {/* Show loading text */}
          </button>
        </form>

        <div className="text-center mt-3">
          <button
            className="btn btn-link"
            onClick={() => history.push('/admin/login')}
          >
            Admin Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
