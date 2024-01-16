import React, { useState, useEffect } from "react";
import { Layout, Button } from "antd";
import Header from "../components/Header";
import ProgramForm from "../components/ProgramForm";
import Sidebar from "../components/Sidebar"; // Import the Sidebar component
import axios from "axios";

const { Header: AntHeader, Sider, Content } = Layout;

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showForm, setShowForm] = useState(false); // State to track form visibility

  const toggleSidebar = () => {
    console.log(sidebarOpen);
    setSidebarOpen(!sidebarOpen);
  };

  const handleProgramSelect = (program) => {
    setSelectedProgram(program);
  };

  const handleAddProgramClick = () => {
    setSelectedProgram(null); // Clear selected program when adding a new one
    setShowForm(true); // Show the form for adding a new program
  };

  const [programList, setProgramList] = useState([]);

  useEffect(() => {
    // Fetch program data from the API (assuming '/programs/' endpoint)
    axios
      .get("/programs/")
      .then((response) => setProgramList(response.data))
      .catch((error) => console.error("Error fetching program data:", error));
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AntHeader>
        <Button type="primary" onClick={toggleSidebar}>
          Toggle Sidebar
        </Button>
        <Button type="primary" onClick={handleAddProgramClick}>
          Add Program +
        </Button>
      </AntHeader>

      <Layout>
        <Sider
          width={200}
          theme="light"
          trigger={null}
          collapsible
          collapsed={!sidebarOpen}
          collapsedWidth={0}
        >
          {/* Use the Sidebar component */}
          {sidebarOpen && (
            <Sidebar onProgramSelect={handleProgramSelect} />
          )}
        </Sider>

        <Layout>
          <Content style={{ margin: "16px" }}>
            <ProgramForm
              program={selectedProgram}
              showForm={showForm}
              onCloseForm={() => setShowForm(false)}
            />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
