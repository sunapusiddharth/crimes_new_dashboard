import React from 'react'
import { Card, Media, Jumbotron, Carousel } from 'react-bootstrap';

export default function VacanciesFeaturedResult(props) {
    return (
        <Carousel.Item className="featured_resulut">
        <img
            className="d-block w-100"
            src="/assets/b.jpg"
            alt="First slide"
        />
        <Carousel.Caption >
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
    </Carousel.Item>
    )
}
