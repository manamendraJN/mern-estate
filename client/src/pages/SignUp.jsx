import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => { 
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }

      setError(null);
      setLoading(false);
      navigate('/sign-in'); 

      toast.success("User created successfully!", {
        position: "top-right",
        autoClose: 2000, // Closes after 2 seconds
      });

      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);

    } catch (error) {
      setLoading(false);
      setError(error?.message || "Something went wrong! Please try again.");
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type="text"
          placeholder='Username'
          id='username'
          value={formData.username} // ✅ Add controlled value
          onChange={handleChange} 
          className='border p-3 rounded-lg'
        />
        <input
          type="email"
          placeholder='Email'
          id='email'
          value={formData.email} // ✅ Add controlled value
          onChange={handleChange} 
          className='border p-3 rounded-lg'
        />
        <input
          type="password"
          placeholder='Password'
          id='password'
          value={formData.password} // ✅ Add controlled value
          onChange={handleChange} 
          className='border p-3 rounded-lg'
        />
        <button disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>

      

      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
  );
}
