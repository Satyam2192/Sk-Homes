import React from 'react';
import { Row, Col, Card, Button } from '@material-tailwind/react';

const properties = [
  {
    type: 'BUY',
    title: 'Properties to buy in Mumbai',
  },
  {
    type: 'RENT',
    title: 'Properties to rent in Mumbai',
  },
  {
    type: 'COMMERCIAL',
    title: 'Commercial properties in Mumbai',
  },
  {
    type: 'NEW',
    title: 'New properties in Mumbai',
  },
  {
    type: 'PG/CO-LIVING',
    title: 'PG/Co-living properties in Mumbai',
  },
  {
    type: 'PLOTS',
    title: 'Plots in Mumbai',
  },
];

const popularLocalities = [
  {
    name: 'Mira Road East',
  },
  {
    name: 'Andheri West',
  },
  {
    name: 'Chembur',
  },
  {
    name: 'Borivali West',
  },
  {
    name: 'Thane',
  },
];

const  HomeSearch=()=> {
  return (
    <div className="my-8">
      
      <Row>
        <Col xs={12}>
          <Card className="flex flex-wrap justify-between items-center rounded-lg shadow-md">
            <div className="w-full px-4 py-2 text-xl font-bold text-center">
              Properties to buy in Mumbai
            </div>
            {properties.map((property) => (
              <Button
                key={property.type}
                className="m-2 px-4 py-2 rounded-md shadow-md bg-gray-200 hover:bg-gray-300 focus:outline-none"
              >
                {property.title}
              </Button>
            ))}
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs={12}>
          <Card className="rounded-lg shadow-md">
            <div className="flex items-center justify-between px-4 py-2 text-lg font-bold">
              <span>Popular Localities</span>
              <input
                type="text"
                placeholder="Search for locality, landmark, project, or builder"
                className="rounded-md border border-gray-300 px-2 py-1 ml-4 focus:outline-none"
              />
            </div>
            <div className="flex flex-wrap justify-between px-4 py-2">
              {popularLocalities.map((locality) => (
                <Button
                  key={locality.name}
                  className="m-2 px-4 py-2 rounded-md shadow-md bg-gray-200 hover:bg-gray-300 focus:outline-none"
                >
                  {locality.name}
                </Button>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default HomeSearch;
