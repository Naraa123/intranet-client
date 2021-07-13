import React, { useEffect } from "react";
import { Modal, Form, Button, Input, message } from "antd";
import { sendReqGet, sendReqPost, sendReqPut } from "services/api";
import { dep } from "configs/url.configs";
const DepForm = ({ visible, depId, onClose }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.resetFields();
    if (depId) {
      getDep();
    }
  }, [depId]);
  const getDep = async () => {
    try {
      const res = await sendReqGet(`${dep.deps}/${depId}`);
      form.setFieldsValue(res.data);
    } catch (e) {
      message.error("Алдаа гарлаа!");
    }
  };
  const saveDep = () => {
    form
      .validateFields()
      .then(async (values) => {
        if (depId) {
          await sendReqPut(dep.deps, { id: depId, ...values });
        } else {
          await sendReqPost(dep.deps, { id: depId, ...values });
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
      title={depId ? "Алба хэлтэс засах" : "Алба хэлтэс бүртгэх"}
      visible={visible}
      onCancel={() => onClose()}
      footer={[
        <Button key="back" onClick={() => onClose()}>
          Хаах
        </Button>,
        <Button key="submit" type="primary" onClick={() => saveDep()}>
          Хадгалах
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Алба хэлтэсийн нэр"
          name="name"
          required
          tooltip="Зайлшгүй бөглөгдөх талбар"
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DepForm;
