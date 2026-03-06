import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Slide } from 'react-toastify';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Layout from '../components/Layout';
import { Eye, EyeSlashFill } from 'react-bootstrap-icons';

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleShowHidePassword = () => {
    setShowPassword((toggle) => !toggle);
  };

  const sendData = async (ev: React.SubmitEvent<HTMLFormElement>) => {
    ev.preventDefault();

    setIsSubmitting(true);

    const formData = {
      username,
      password,
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const responseJson = await response.json();

    setIsSubmitting(false);

    if (!response.ok) {
      toast.error(responseJson.message, {
        position: 'top-right',
        autoClose: 2000,
        theme: 'colored',
        transition: Slide,
      });

      return;
    }

    localStorage.setItem('access-token', responseJson.access_token);

    toast.success('Login feito com sucesso!', {
      position: 'top-right',
      autoClose: 1000,
      theme: 'colored',
      transition: Slide,
      onClose: () => {
        navigate('/dashboard');
      },
    });
  }

  return (
    <Layout>
      <Row>
        <Col className="mx-auto" sm={9} md={7} lg={5}>
          <Card className="border-0 shadow rounded-3 my-5">
            <Card.Body className="p-4 p-sm-5">
              <Card.Title className="text-center fw-bold mb-5">
                Quiz Sistema
              </Card.Title>
              <Form onSubmit={sendData}>
                <FloatingLabel
                  controlId="username"
                  label="Usuário"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Usuário"
                    value={username}
                    onChange={(ev) => setUsername(ev.target.value)}
                  />
                </FloatingLabel>
                <InputGroup className="mb-3">
                  <div className="form-floating">
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Senha"
                      value={password}
                      onChange={(ev) => setPassword(ev.target.value)}
                    />
                    <label htmlFor="password">Senha</label>
                  </div>
                  <Button variant="outline-secondary" onClick={toggleShowHidePassword}>
                    {showPassword ? <Eye className="fs-5" /> : <EyeSlashFill className="fs-5" />}
                  </Button>
                </InputGroup>
                <div className="d-grid">
                  <Button variant="primary" type="submit" disabled={!username || !password || isSubmitting}>
                    Entrar {isSubmitting ? <Spinner size="sm" /> : null}
                  </Button>
                </div>
                <hr className="my-4" />
                <div className="d-grid">
                  <Link className="text-center" to="/registrar">Registrar nova conta</Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </Layout>
  );
}

export default Login;
