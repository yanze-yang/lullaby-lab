import React from "react";
import CategoryForm from "../../components/form/CategoryForm";

export async function getStaticProps() {
  return {
    props: {},
  };
}

const CreateCategory = () => {
  return <CategoryForm operation="create" />;
};

export default CreateCategory;
