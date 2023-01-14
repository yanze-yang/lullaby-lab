import React from "react";
import DashboardLayout from "../../components/layout/DashboradLayout";
import Demo from "./Chart";
import { Col, Row } from "antd";
import type { GetSessionParams } from "next-auth/react";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context: GetSessionParams) {
  // Check if user is authenticated
  const session = await getSession(context);
  // If not, redirect to the homepage
  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: {},
  };
}

export default function Dashboard() {
  return (
    <DashboardLayout>
      <>
        <Row>
          <Col span={24}>{<Demo />}</Col>
        </Row>
        {/* <Row>
          <Col span={12}>col-12</Col>
          <Col span={12}>col-12</Col>
        </Row> */}
        {/* <Row>
          <Col span={8}></Col>
          <Col span={8}>col-8</Col>
          <Col span={8}>col-8</Col>
        </Row> */}
      </>
    </DashboardLayout>
  );
}
