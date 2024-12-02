import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import styles from '../header/Header.module.css';

const Header = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <Navbar expand="lg" className={styles.header}>
            <Container fluid className="mx-2">
                <Navbar.Brand href="#" className={styles.logo}>
                    <img
                        src="/images/logo.png"
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </Navbar.Brand>

                <Navbar.Toggle
                    aria-controls="responsive-navbar-nav"
                    onClick={toggleMobileMenu}

                />

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mx-auto" activeKey="/">
                        <Nav.Link href="/" className={styles.navItem}>
                            Home
                        </Nav.Link>
                        <Nav.Link href="#" className={styles.navItem}>
                            Catalog
                        </Nav.Link>
                        <Nav.Link href="#" className={styles.navItem}>
                            More
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#" className={styles.navItem}>
                            Login
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            {isMobileMenuOpen && (
                <div className={styles.mobileMenu}>
                    <NavDropdown title="Menu" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#">Home</NavDropdown.Item>
                        <NavDropdown.Item href="#">Catalog</NavDropdown.Item>
                        <NavDropdown.Item href="#">More</NavDropdown.Item>
                        <NavDropdown.Item href="#">Login</NavDropdown.Item>
                    </NavDropdown>
                </div>
            )}
        </Navbar>
    );
};

export default Header;