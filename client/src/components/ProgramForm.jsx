import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, Switch, InputNumber } from "antd";
import axios from "axios";

const { Option } = Select;

const ProgramForm = ({ program, showForm, onCloseForm }) => {
  const [form] = Form.useForm();

  // Set initial values based on whether it's an edit or create
  useEffect(() => {
    if (showForm && program) {
      form.setFieldsValue(program);
    } else {
      form.resetFields();
    }
  }, [program, showForm, form]);

  // Handle form submission
  const handleSubmit = async (values) => {
    // Perform actions with the form data, like sending it to the server
    console.log("Form data submitted:", values);
    try {
      if (program) {
        // If program prop is provided, update the existing program
        await axios.put(`/programs/${program.programid}`, values).then(() => {
          console.log(program.programid);
        });
      } else {
        // Otherwise, create a new program
        await axios.post("/programs/", values);
      }
      onCloseForm();
      // You may add additional logic here, such as showing a success message
    } catch (err) {
      console.log(err);
      // Handle errors here, show an error message or perform any other actions
    }
  };
  const handleDelete = async () => {
    try {
      if (program) {
        // If program prop is provided, delete the existing program
        await axios.delete(`/programs/${program.programid}`);
        // onDelete(program.programid);
        message.success("Program deleted successfully!");
        onCloseForm();
      }
    } catch (err) {
      console.error("Error deleting program:", err);
      message.error("Failed to delete the program. Please try again.");
    }
  };

  return (
    <div className=" mx-auto max-w-2xl p-6 bg-white shadow-md rounded-md">
      <Form
        form={form}
        onFinish={handleSubmit}
        initialValues={{
          name: "",
          price: "",
          domain: "",
          program_type: "FT",
          registrations_status: "yes",
          description: "",
          placement_assurance: true,
          image_url: "",
          university_name: "",
          faculty_profile: "",
          learning_hours: 0,
          certificate_diploma: "",
          eligibility_criteria: "",
          ...program, // Set initial values from the program prop
        }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter the program name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              type: "number",
              message: "Please enter a valid price",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Domain"
          name="domain"
          rules={[{ required: true, message: "Please select a domain" }]}
        >
          <Select>
            <Option value="finance">Finance</Option>
            <Option value="data">Data</Option>
            <Option value="tech">Tech</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Program Type"
          name="program_type"
          rules={[{ required: true, message: "Please select a program type" }]}
        >
          <Select>
            <Option value="FT">Full Time</Option>
            <Option value="PT">Part Time</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Registrations Status"
          name="registrations_status"
          rules={[
            {
              required: true,
              message: "Please select registrations status",
            },
          ]}
        >
          <Select>
            <Option value="yes">Yes</Option>
            <Option value="no">No</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Placement Assurance"
          name="placement_assurance"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item label="Image URL" name="image_url">
          <Input />
        </Form.Item>
        <Form.Item label="University Name" name="university_name">
          <Input />
        </Form.Item>
        <Form.Item label="Faculty Profile" name="faculty_profile">
          <Input />
        </Form.Item>
        <Form.Item
          label="Learning Hours"
          name="learning_hours"
          rules={[
            {
              required: true,
              type: "number",
              message: "Please enter learning hours",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item label="Certificate/Diploma" name="certificate_diploma">
          <Select>
            <Option value="Certificate">Certificate</Option>
            <Option value="Diploma">Diploma</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Eligibility Criteria" name="eligibility_criteria">
          <Select>
            <Option value="10th Pass">10th Pass</Option>
            <Option value="12th Pass">12th Pass</Option>
            <Option value="Graduate">Graduate</Option>
            <Option value="Post Graduate">Post Graduate</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            onClick={handleDelete}
            style={{
              background: "#1890ff",
              color: "white",
              padding: "4px 4px 4px 4px",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Delete
          </Button>
          
          <Button
            type="primary"
            htmlType="submit"
            style={{
              background: "#1890ff",
              color: "white",
              padding: "4px 4px 4px 4px",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProgramForm;
