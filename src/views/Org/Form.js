import React, { useEffect } from "react";
import { Modal, Form, Button, Input, message } from "antd";
import { sendReqGet, sendReqPost, sendReqPut } from "services/api";
import { org } from "configs/url.configs";

const OrgForm = ({ visible, orgId, onClose }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.resetFields();
    if (orgId) {
      getOrg();
    }
  }, [orgId]);
  const getOrg = async () => {
    try {
      const res = await sendReqGet(`${org.orgs}/${orgId}`);
      form.setFieldsValue(res.data);
    } catch (e) {
      message.error("Алдаа гарлаа!");
    }
  };
  const saveOrg = () => {
    form
      .validateFields()
      .then(async (values) => {
        if (orgId) {
          await sendReqPut(org.orgs, { id: orgId, ...values });
        } else {
          await sendReqPost(org.orgs, { id: orgId, ...values });
        }
        message.success("Амжилттай");
        onClose();
      })
      .catch((e) => {
        message.error("Алдаа гарлаа orm!");
      });
  };
  return (
    <Modal
      title={orgId ? "Байгууллагын мэдээлэл засах" : "Байгууллага бүртгэх"}
      visible={visible}
      onCancel={() => onClose()}
      footer={[
        <Button key="back" onClick={() => onClose()}>
          Хаах
        </Button>,
        <Button key="submit" type="primary" onClick={() => saveOrg()}>
          Хадгалах
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Байгууллагын нэр"
          name="name"
          required
          tooltip="Зайлшгүй бөглөгдөх талбар"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="ceo_name"
          label="Гүйцэтгэх захирал"
          required
          tooltip="Зайлшгүй бөглөгдөх талбар"
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default OrgForm;
