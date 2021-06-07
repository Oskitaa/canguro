import { Col, Container, Row } from "react-bootstrap"
export default function Bottom(){
    return(
        <Container className="footer">
            <Row>
                <Col>
                    <h3>Contacto</h3>
                    <p>Puedes contactarnos a través de los siguientes medios</p>
                    <p><i class="fas fa-location-arrow"></i> C/Lobo, 19, Sevilla</p>
                    <p><i class="fas fa-phone"></i>+346000000000</p>
                    <p><i class="fas fa-envelope"></i>test@test.com</p>
                </Col>
                <Col>
                    <h3>Enlaces de interes</h3>
                    <p>Enlace 1</p>
                    <p>Enlace 2</p>
                    <p>Enlace 3</p>
                    <p>Enlace 4</p>
                </Col>
                <Col>
                    <h3>Redes sociales</h3>
                    <p><i class="fab fa-twitter"></i>Twitter</p>
                    <p><i class="fab fa-facebook"></i>Facebook</p>
                    <p><i class="fab fa-instagram-square"></i>Instagram</p>
                    <p><i class="fab fa-whatsapp"></i>WhatsApp</p>
                </Col>
                <Col>
                    <h3>Ayuda</h3>
                    <p>Términos y condiciones</p>
                    <p>Política de privacidad</p>
                    <p>Cookies</p>
                    <p>Reglas</p>
                </Col>
            </Row>
            
            <style type="text/css">{`
                .footer{
                    padding:15px;
                    margin-top:5em;
                    height:300px;
                    border-top: 1px solid #ddd;
                }

            `}</style>
        </Container>
    )
}