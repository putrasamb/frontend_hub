import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBoxOpen, FaBoxes, FaTruckLoading, FaChartLine } from "react-icons/fa";
import Navbar from "./components/navbar";
import AddPenerimaanBarang from "./components/AddPenerimaanBarang";
import AddPengeluaranBarang from "./components/AddPengeluaranBarang";
import ViewStock from "./components/ViewStock";
import Login from "./components/login";

import PropTypes from 'prop-types';

const Layout = ({ children, gradientColor = "primary" }) => {
  const gradients = {
    primary: "linear-gradient(135deg, #4b6cb7 0%, #182848 100%)",
    secondary: "linear-gradient(135deg, #2c3e50 0%, #1a2a3a 100%)",
      success: "linear-gradient(135deg, #2c7744 0%, #134e5e 100%)"
    };
    
    FeatureCard.propTypes = {
      icon: PropTypes.node.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    };
  
    return (
      <div
        style={{
          background: gradients[gradientColor],
          minHeight: "100vh",
        }}
      >
        <Navbar />
        <div
          className="container mt-4 pb-5"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "12px",
            padding: "25px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)"
          }}
        >
          {children}
        </div>
        <footer>
          <small>© {new Date().getFullYear()} Gudang App - Warehouse Management System</small>
        </footer>
      </div>
    );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  gradientColor: PropTypes.string
};

const FeatureCard = ({ icon, title, description, path }) => {
  return (
    <motion.div
      whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
      className="col-md-6 col-lg-3 mb-4"
    >
      <a href={path} style={{ textDecoration: "none" }}>
        <div className="card h-100 border-0 shadow">
          <div className="card-body text-center p-4">
            <div 
              style={{ 
                fontSize: "3rem", 
                marginBottom: "1rem",
                color: "#4b6cb7"
              }}
            >
              {icon}
            </div>
            <h3 className="card-title h5 mb-3">{title}</h3>
            <p className="card-text text-muted">{description}</p>
          </div>
        </div>
      </a>
    </motion.div>
  );
};

function HomePage() {
  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-5"
      >
        <h1 className="display-4 fw-bold text-primary mb-4">Gudang App</h1>
        <p className="lead text-secondary mb-5">
          Sistem pengelolaan gudang modern untuk mengoptimalkan penerimaan, pengeluaran, dan monitoring stok barang
        </p>
      </motion.div>
      
      <div className="row g-4">
        <FeatureCard 
          icon={<FaBoxOpen />}
          title="Penerimaan Barang"
          description="Catat dan kelola seluruh barang masuk ke gudang dengan mudah dan terstruktur."
          path="/ingoing"
        />
        <FeatureCard 
          icon={<FaBoxes />}
          title="Pengeluaran Barang"
          description="Dokumentasikan pengambilan barang secara akurat dengan proses yang efisien."
          path="/outgoing"
        />
        <FeatureCard 
          icon={<FaChartLine />}
          title="Monitoring Stok"
          description="Pantau persediaan barang secara real-time dengan tampilan visual yang informatif."
          path="/stock"
        />
        <FeatureCard 
          icon={<FaTruckLoading />}
          title="Manajemen Inventaris"
          description="Kelola seluruh aset gudang dengan sistem pelaporan otomatis dan terperinci."
          path="/stock"
        />
        <FeatureCard 
          icon={<FaChartLine />}
          title="Login"
          description="Masuk ke sistem untuk mengelola dan memantau aktivitas gudang."
          path="/login"
        />
      </div>
      
      <div className="mt-5 p-4 bg-light rounded-3">
        <h3 className="h5 mb-3">Statistik Cepat</h3>
        <div className="row text-center">
          <div className="col-md-4">
            <h2 className="text-primary">99.8%</h2>
            <p className="text-muted">Akurasi Inventaris</p>
          </div>
          <div className="col-md-4">
            <h2 className="text-primary">50%</h2>
            <p className="text-muted">Peningkatan Efisiensi</p>
          </div>
          <div className="col-md-4">
            <h2 className="text-primary">24/7</h2>
            <p className="text-muted">Monitoring Real-time</p>
          </div>
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout gradientColor="primary">
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/ingoing"
          element={
            <Layout gradientColor="secondary">
              <AddPenerimaanBarang />
            </Layout>
          }
        />
        <Route
          path="/outgoing"
          element={
            <Layout gradientColor="secondary">
              <AddPengeluaranBarang />
            </Layout>
          }
        />
        <Route
          path="/stock"
          element={
            <Layout gradientColor="success">
              <ViewStock />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout gradientColor="primary">
              <Login />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;