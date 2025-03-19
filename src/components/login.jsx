import { useState } from 'react';
import axios from 'axios';
import { FaWarehouse, FaEnvelope, FaLock, FaSpinner, FaCheck } from 'react-icons/fa';

const styles = `
.login-page {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #4b6cb7 0%, #182848 100%);
    padding: 20px;
    position: relative;
    overflow: hidden;
}

.login-page::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 60%);
    animation: rotate 30s linear infinite;
    z-index: 1;
}

@keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.login-container {
    width: 100%;
    max-width: 420px;
    position: relative;
    z-index: 2;
}

.login-card {
    background-color: rgba(255, 255, 255, 0.95);
    border-radius: 16px;
    padding: 40px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    transform: translateY(0);
    transition: transform 0.5s ease, box-shadow 0.5s ease;
    animation: fadeIn 0.8s ease-out;
}

.login-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.logo-container {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 90px;
    height: 90px;
    background: linear-gradient(135deg, #4b6cb7 0%, #182848 100%);
    border-radius: 50%;
    margin-bottom: 15px;
    box-shadow: 0 10px 20px rgba(24, 40, 72, 0.4);
    position: relative;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(75, 108, 183, 0.7); }
    70% { box-shadow: 0 0 0 12px rgba(75, 108, 183, 0); }
    100% { box-shadow: 0 0 0 0 rgba(75, 108, 183, 0); }
}

.logo-icon {
    color: white;
    font-size: 46px;
    filter: drop-shadow(0 2px 5px rgba(0,0,0,0.3));
    animation: float 3s ease-in-out infinite;
}

@keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-5px); }
    100% { transform: translateY(0px); }
}

.text-center {
    text-align: center;
}

.app-name {
    font-size: 28px;
    font-weight: 800;
    background: linear-gradient(135deg, #4b6cb7 0%, #182848 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0;
    letter-spacing: -0.5px;
}

.login-subtitle {
    color: #666;
    font-size: 15px;
    margin-top: 5px;
    font-weight: 500;
    letter-spacing: 0.3px;
}

.login-title {
    font-size: 22px;
    font-weight: 600;
    color: #333;
    margin: 25px 0;
    text-align: center;
    position: relative;
}

.login-title::after {
    content: "";
    display: block;
    width: 40px;
    height: 3px;
    background: linear-gradient(135deg, #4b6cb7 0%, #182848 100%);
    margin: 10px auto 0;
    border-radius: 2px;
}

.form-group {
    margin-bottom: 25px;
    position: relative;
}

.form-group label {
    display: block;
    margin-bottom: 10px;
    font-weight: 600;
    color: #444;
    font-size: 15px;
    display: flex;
    align-items: center;
    transition: color 0.3s;
}

.input-icon {
    margin-right: 10px;
    color: #4b6cb7;
    font-size: 18px;
}

.form-control {
    width: 100%;
    padding: 15px 20px;
    font-size: 16px;
    border: 2px solid #e0e0e0;
    border-radius: 12px;
    transition: all 0.3s ease;
    background-color: #f9f9f9;
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);
}

.form-control:focus {
    border-color: #4b6cb7;
    box-shadow: 0 0 0 3px rgba(75, 108, 183, 0.2);
    outline: none;
    background-color: #fff;
}

.form-control::placeholder {
    color: #aaa;
}

.form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
}

.remember-me {
    display: flex;
    align-items: center;
    gap: 10px;
}

.custom-checkbox {
    position: relative;
    width: 18px;
    height: 18px;
    border: 2px solid #4b6cb7;
    border-radius: 4px;
    display: inline-block;
    cursor: pointer;
    overflow: hidden;
}

.custom-checkbox input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

.checkmark {
    position: absolute;
    top: 1px;
    left: 1px;
    height: 12px;
    width: 12px;
    background-color: #4b6cb7;
    border-radius: 2px;
    transform: scale(0);
    transition: transform 0.2s ease;
}

.custom-checkbox input:checked ~ .checkmark {
    transform: scale(1);
}

.remember-me label {
    font-size: 14px;
    color: #666;
    cursor: pointer;
    user-select: none;
}

.forgot-password {
    font-size: 14px;
    color: #4b6cb7;
    text-decoration: none;
    transition: all 0.3s;
    font-weight: 600;
    position: relative;
}

.forgot-password::after {
    content: '';
    position: absolute;
    width: 0;
    height: 1.5px;
    bottom: -2px;
    left: 0;
    background-color: #4b6cb7;
    transition: width 0.3s;
}

.forgot-password:hover::after {
    width: 100%;
}

.forgot-password:hover {
    color: #182848;
}

.error-message {
    background-color: rgba(255, 76, 76, 0.1);
    color: #e53935;
    padding: 12px 18px;
    border-radius: 10px;
    margin-bottom: 25px;
    font-size: 14px;
    border-left: 4px solid #e53935;
    display: flex;
    align-items: center;
    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}

@keyframes shake {
    10%, 90% { transform: translate3d(-1px, 0, 0); }
    20%, 80% { transform: translate3d(2px, 0, 0); }
    30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
    40%, 60% { transform: translate3d(4px, 0, 0); }
}

.error-icon {
    margin-right: 10px;
    font-size: 18px;
}

.login-button {
    width: 100%;
    padding: 15px;
    background: linear-gradient(135deg, #4b6cb7 0%, #182848 100%);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 17px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    position: relative;
    overflow: hidden;
}

.login-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: all 0.5s;
}

.login-button:hover::before {
    left: 100%;
}

.login-button:hover {
    box-shadow: 0 8px 20px rgba(24, 40, 72, 0.4);
    transform: translateY(-2px);
}

.login-button:active {
    transform: translateY(1px);
}

.login-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.spinner {
    animation: spin 1.2s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.success-message {
    background-color: rgba(76, 175, 80, 0.1);
    color: #43a047;
    padding: 12px 18px;
    border-radius: 10px;
    margin-bottom: 25px;
    font-size: 14px;
    border-left: 4px solid #43a047;
    display: flex;
    align-items: center;
}

.success-icon {
    margin-right: 10px;
    font-size: 18px;
}

.alternate-login {
    margin-top: 30px;
    text-align: center;
    position: relative;
}

.divider {
    position: relative;
    margin: 30px 0;
    text-align: center;
}

.divider::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: #e0e0e0;
}

.divider span {
    position: relative;
    background: white;
    padding: 0 15px;
    color: #777;
    font-size: 14px;
}

.social-buttons {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 20px;
}

.social-button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    transition: all 0.3s;
    font-size: 20px;
    color: white;
}

.social-button.google {
    background: #DB4437;
}

.social-button.facebook {
    background: #4267B2;
}

.social-button.twitter {
    background: #1DA1F2;
}

.social-button:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.no-account {
    margin-top: 25px;
    text-align: center;
    font-size: 14px;
    color: #666;
}

.signup-link {
    color: #4b6cb7;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s;
}

.signup-link:hover {
    color: #182848;
    text-decoration: underline;
}

@media (max-width: 480px) {
    .login-card {
        padding: 30px 25px;
    }
    
    .form-options {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
    }
    
    .form-control {
        padding: 13px 15px;
    }
    
    .login-button {
        padding: 13px;
    }
}
`;

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        setIsLoading(true);
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        try {
            const response = await axios.post('http://localhost:8011/login', { email, password });
            console.log('Login successful:', response.data);
            setSuccess(true);
            
            // Simulate redirect after successful login
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1000);
            
        } catch (err) {
            console.error('Login error:', err);
            setError('Invalid email or password. Please check your credentials and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page">
            <style>{styles}</style>
            <div className="login-container">
                <div className="login-card">
                    <div className="text-center">
                        <div className="logo-container">
                            <FaWarehouse className="logo-icon" />
                        </div>
                        <h1 className="app-name">GUDANG APP</h1>
                        <p className="login-subtitle">Warehouse Management System</p>
                    </div>
                    
                    <h2 className="login-title">Sign In to Your Account</h2>
                    
                    {error && (
                        <div className="error-message">
                            <FaSpinner className="error-icon" />
                            {error}
                        </div>
                    )}
                    
                    {success && (
                        <div className="success-message">
                            <FaCheck className="success-icon" />
                            Login successful! Redirecting to dashboard...
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">
                                <FaEnvelope className="input-icon" /> Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoFocus
                                disabled={isLoading || success}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="password">
                                <FaLock className="input-icon" /> Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isLoading || success}
                            />
                        </div>
                        
                        <div className="form-options">
                            <div className="remember-me">
                                <div className="custom-checkbox">
                                    <input 
                                        type="checkbox" 
                                        id="remember" 
                                        checked={rememberMe}
                                        onChange={() => setRememberMe(!rememberMe)}
                                        disabled={isLoading || success}
                                    />
                                    <span className="checkmark"></span>
                                </div>
                                <label htmlFor="remember">Remember me</label>
                            </div>
                            <a href="#forgot-password" className="forgot-password">Forgot password?</a>
                        </div>
                        
                        <button 
                            type="submit" 
                            className="login-button"
                            disabled={isLoading || success}
                        >
                            {isLoading ? (
                                <>
                                    <FaSpinner className="spinner" /> Signing in...
                                </>
                            ) : success ? (
                                <>
                                    <FaCheck /> Signed in!
                                </>
                            ) : 'Sign In'}
                        </button>
                        
                        <div className="divider">
                            <span>or continue with</span>
                        </div>
                        
                        <div className="social-buttons">
                            <button type="button" className="social-button google">G</button>
                            <button type="button" className="social-button facebook">f</button>
                            <button type="button" className="social-button twitter">t</button>
                        </div>
                        
                        <div className="no-account">
                            Don't have an account? <a href="#signup" className="signup-link">Sign up</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;