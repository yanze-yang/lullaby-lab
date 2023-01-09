import React from "react";
import ContactForm from "../../components/form/ContactForm";

export async function getStaticProps() {
  return {
    props: {},
  };
}

const CreateContact = () => {
  return <ContactForm operation="create" />;
};

export default CreateContact;
