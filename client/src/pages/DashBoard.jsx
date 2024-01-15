import React, { useState } from 'react';
import { Layout, Button } from 'antd';
import Header from '../components/Header';
import ProgramForm from '../components/ProgramForm';
import Sidebar from '../components/Sidebar'; // Import the Sidebar component

const { Header: AntHeader, Sider, Content } = Layout;

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedProgram, setSelectedProgram] = useState(null);

  const toggleSidebar = () => {
    console.log(sidebarOpen);
    setSidebarOpen(!sidebarOpen);
  };

  const handleProgramSelect = (program) => {
    setSelectedProgram(program);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AntHeader>
        <Button type="primary" onClick={toggleSidebar}>
          Toggle Sidebar
        </Button>
      </AntHeader>

      <Layout>
        <Sider width={200} theme="light" trigger={null} collapsible collapsed={!sidebarOpen} collapsedWidth={0}>
          {/* Use the Sidebar component */}
          {sidebarOpen && <Sidebar onProgramSelect={handleProgramSelect} />}
        </Sider>

        <Layout>
          <Content style={{ margin: '16px' }}>
            <ProgramForm program={selectedProgram} />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Dashboard;