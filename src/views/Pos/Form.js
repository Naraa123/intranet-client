import React, { useEffect } from "react";
import { Modal, Form, Button, Input, message } from "antd";
import { sendReqGet, sendReqPost, sendReqPut } from "services/api";
import { pos } from "configs/url.configs";
const PosForm = ({ visible, posId, onClose }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.resetFields();
    if (posId) {
      getPos();
    }
  }, [posId]);
  const getPos = async () => {
    try {
      const res = await sendReqGet(`${pos.position}/${posId}`);
      form.setFieldsValue(res.data);
    } catch (e) {
      message.error("Алдаа гарлаа!");
    }
  };
  const savePos = () => {
    form
      .validateFields()
      .then(async (values) => {
        if (posId) {
          await sendReqPut(pos.position, { id: posId, ...values });
        } else {
          await sendReqPost(pos.position, { id: posId, ...values });
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
      title={posId ? "Албан тушаал засах" : "Албан тушаал бүртгэх"}
      visible={visible}
      onCancel={() => onClose()}
      footer={[
        <Button key="back" onClick={() => onClose()}>
          Хаах
        </Button>,
        <Button key="submit" type="primary" onClick={() => savePos()}>
          Хадгалах
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Албан тушаалын нэр"
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

export default PosForm;
