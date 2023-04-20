import React from "react";

import { Card, Stack, Image, Row, Col } from "react-bootstrap";

const BookDetails = ({ bookData, showSnippet = true }) => {
  const coverImage = bookData?.coversList.large
    ? bookData.coversList.large
    : bookData?.coversList.medium
    ? bookData.coversList.medium
    : null;

  return (
    bookData && (
      <>
        <Stack direction="horizontal" gap={3}>
          <Image src={coverImage} alt={`${bookData.title} cover`} thumbnail />
          <Row>
            {bookData.title && <h4>{bookData.title}</h4>}
            {bookData.subtitle && <h5>{bookData.subtitle}</h5>}
            {bookData.authorString && <div>By: {bookData.authorString}</div>}
            {bookData.publisher && <div>Publisher: {bookData.publisher}</div>}
            {bookData.publishDate && (
              <div>Published: {bookData.publishDate}</div>
            )}
            {bookData.pageCoun && <div>{bookData.pageCount} pages</div>}
            {bookData.categoriesString && (
              <div>Genre: {bookData.categoriesString}</div>
            )}
            <Row>
              {bookData.isbn.isbn10 && (
                <Col xs={12} md={6}>
                  ISBN-10: {bookData.isbn.isbn10}
                </Col>
              )}
              {bookData.isbn.isbn13 && (
                <Col xs={12} md={6}>
                  ISBN-13: {bookData.isbn.isbn13}
                </Col>
              )}
            </Row>
          </Row>
        </Stack>
        {showSnippet && <div>{bookData.snippet}</div>}
      </>
    )
  );
};

export default BookDetails;
