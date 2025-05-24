import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
  },
  image: {
    width: '100%',
    maxWidth: '320px', // max width of the image
    aspectRatio: '1/0', // 4:3 aspect ratio for better fit
    objectFit: 'cover',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
  textContainer: {
    padding: '1rem',
    fontSize: '1.5rem',
    whiteSpace: 'pre-wrap',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'left',
  },
};

function About({ header }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.about)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container>
          {data ? (
            <Fade>
              <Row className="align-items-center">
                {/* Text on the left */}
                <Col xs={12} md={8} style={styles.textContainer}>
                  <ReactMarkdown>{data.about}</ReactMarkdown>
                </Col>
                {/* Image on the right */}
                <Col xs={12} md={4} style={styles.imageContainer}>
                  <img src={data?.imageSource} alt="profile" style={styles.image} />
                </Col>
              </Row>
            </Fade>
          ) : (
            <FallbackSpinner />
          )}
        </Container>
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
