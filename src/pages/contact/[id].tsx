import React from "react";
import { prisma } from "../../server/db/client";
import type { IContact } from "../../types";
import ContactForm from "../../components/form/ContactForm";

export async function getStaticProps({ params }: { params: { id: string } }) {
  const contact = await prisma.contact.findUnique({
    where: { id: params.id },
  });

  if (contact) {
    return {
      props: {
        contact: JSON.parse(JSON.stringify(contact)),
      },
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}

export async function getStaticPaths() {
  const contacts = await prisma.contact.findMany({
    select: { id: true },
  });

  return {
    paths: contacts.map((contact) => ({
      params: { id: contact.id },
    })),
    fallback: true,
  };
}

const EditContact = ({ contact }: { contact: IContact }) => {
  if (!contact) return null;
  return <ContactForm contact={contact} operation="update" />;
};

export default EditContact;
