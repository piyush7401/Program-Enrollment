import React from 'react';
import { Form, Input, Select, Button, Switch, InputNumber } from 'antd';

const { Option } = Select;

const ProgramForm = ({ program }) => {
  const [form] = Form.useForm();

  // Handle form submission
  const handleSubmit = (values) => {
    // Perform actions with the form data, like sending it to the server
    console.log('Form data submitted:', values);
  };

  return (
    <div className="program-form mx-auto max-w-2xl p-6 bg-white shadow-md rounded-md">
      <Form
        form={form}
        onFinish={handleSubmit}
        initialValues={{
          name: '',
          price: 0,
          domain: '',
          programType: 'FT',
          registrationsStatus: 'yes',
          description: '',
          placementAssurance: false,
          imageUrl: '',
          universityName: '',
          facultyProfile: [],
          learningHours: 0,
          certificateDiploma: '',
          eligibilityCriteria: [],
        }}
      >
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter the program name' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Price" name="price" rules={[{ required: true, type: 'number', message: 'Please enter a valid price' }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item label="Domain" name="domain" rules={[{ required: true, message: 'Please select a domain' }]}>
          <Select>
            <Option value="finance">Finance</Option>
            <Option value="data">Data</Option>
            <Option value="tech">Tech</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Program Type" name="programType" rules={[{ required: true, message: 'Please select a program type' }]}>
          <Select>
            <Option value="FT">Full Time</Option>
            <Option value="PT">Part Time</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Registrations Status" name="registrationsStatus" rules={[{ required: true, message: 'Please select registrations status' }]}>
          <Select>
            <Option value="yes">Yes</Option>
            <Option value="no">No</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Placement Assurance" name="placementAssurance" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="Image URL" name="imageUrl">
          <Input />
        </Form.Item>
        <Form.Item label="University Name" name="universityName">
          <Input />
        </Form.Item>
        <Form.Item label="Faculty Profile" name="facultyProfile">
          <Select mode="multiple">
            <Option value="link1">LinkedIn Profile 1</Option>
            <Option value="link2">LinkedIn Profile 2</Option>
            <Option value="link3">LinkedIn Profile 3</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Learning Hours" name="learningHours" rules={[{ required: true, type: 'number', message: 'Please enter learning hours' }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item label="Certificate/Diploma" name="certificateDiploma" rules={[{ required: true, message: 'Please select certificate or diploma' }]}>
          <Select>
            <Option value="certificate">Certificate</Option>
            <Option value="diploma">Diploma</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Eligibility Criteria" name="eligibilityCriteria" rules={[{ required: true, message: 'Please select eligibility criteria' }]}>
          <Select mode="multiple">
            <Option value="graduate">Graduate</Option>
            <Option value="postgraduate">Postgraduate</Option>
            <Option value="12th">12th Pass</Option>
            <Option value="10th">10th Pass</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProgramForm;