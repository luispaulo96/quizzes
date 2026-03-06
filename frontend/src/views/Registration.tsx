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

function Registration() {
  const navigate = useNavigate();

  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleShowHidePassword = () => {
    setShowPassword((toggle) => !toggle);
  }

  const toggleShowHideConfirm = () => {
    setShowConfirm((toggle) => !toggle);
  }

  const sendData = async (ev: React.SubmitEvent<HTMLFormElement>) => {
    ev.preventDefault();

    setIsSubmitting(true);

    if (newPassword !== confirmPassword) {
      toast.error('As senhas informadas devem ser iguais!', {
        position: 'top-right',
        autoClose: 2000,
        theme: 'colored',
        transition: Slide,
      });

      setIsSubmitting(false);

      return;
    }

    const formData = {
      vc_username: newUsername,
      vc_password: newPassword,
    };

    const signupResponse = await fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const signupResponseJson = await signupResponse.json();

    setIsSubmitting(false);

    if (!signupResponse.ok) {
      toast.error(signupResponseJson.message, {
        position: 'top-right',
        autoClose: 2000,
        theme: 'colored',
        transition: Slide,
      });

      return;
    }

    toast.success('Usuário cadastrado com sucesso!', {
      position: 'top-right',
      autoClose: 2000,
      theme: 'colored',
      transition: Slide,
      onClose: () => {
        navigate('/');
      },
    });
  }

  return (
    <Layout>
      <Row>
        <Col className="mx-auto" sm={9} md={7} lg={5}>
          <Card className="border-0 shadow rounded-3 my-5">
            <Card.Body className="p-4 p-sm-5">
              <Card.Title className="text-center mb-5">
                Registrar nova conta
              </Card.Title>
              <Form onSubmit={sendData}>
                <FloatingLabel
                  controlId="new_username"
                  label="Novo usuário"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Novo usuário"
                    value={newUsername}
                    onChange={(ev) => setNewUsername(ev.target.value)}
                  />
                </FloatingLabel>
                <InputGroup className="mb-3">
                  <div className="form-floating">
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Nova senha"
                      value={newPassword}
                      onChange={(ev) => setNewPassword(ev.target.value)}
                    />
                    <label htmlFor="password">Nova senha</label>
                  </div>
                  <Button variant="outline-secondary" onClick={toggleShowHidePassword}>
                    {showPassword ? <Eye className="fs-5" /> : <EyeSlashFill className="fs-5" />}
                  </Button>
                </InputGroup>
                <InputGroup className="mb-3">
                  <div className="form-floating">
                    <Form.Control
                      type={showConfirm ? 'text' : 'password'}
                      placeholder="Confirmar senha"
                      value={confirmPassword}
                      onChange={(ev) => setConfirmPassword(ev.target.value)}
                    />
                    <label htmlFor="password">Confirmar senha</label>
                  </div>
                  <Button variant="outline-secondary" onClick={toggleShowHideConfirm}>
                    {showConfirm ? <Eye className="fs-5" /> : <EyeSlashFill className="fs-5" />}
                  </Button>
                </InputGroup>
                <div className="d-grid">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={!newUsername || !newPassword || !confirmPassword || isSubmitting}
                  >
                    Registrar {isSubmitting ? <Spinner size="sm" /> : null}
                  </Button>
                </div>
                <hr className="my-4" />
                <div className="d-grid">
                  <Link className="text-center" to="/">Voltar</Link>
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

export default Registration;
