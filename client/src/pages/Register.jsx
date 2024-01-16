import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Alert } from "antd";
import axios from "axios";
import { BACKEND_URL } from "../variables";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (values) => {
    try {
      const { data } = await axios.post(`${BACKEND_URL}/auth/register`, values);
      if (data.success) {
        alert("Register Successfully ");
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred");
      }
      console.error(error);
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Form
        name="register"
        onFinish={handleSubmit}
        scrollToFirstError
        className="bg-white p-8 rounded-md shadow-md"
        style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Registration is Required!!</h1>
        </div>
        <div className="space-y-4">
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input className="w-full" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: "email",
                message: "The input is not a valid email!",
              },
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input className="w-full" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password className="w-full" />
          </Form.Item>
        </div>
        <div className="mt-6">
          <div className="flex justify-between items-center">
            <p>
              Already Registered!! <Link to="/">Login</Link>
            </p>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#1890ff' }}>
              Register
            </Button>
          </div>
        </div>
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            className="mt-4"
          />
        )}
      </Form>
    </div>
  );
};

export default Register;