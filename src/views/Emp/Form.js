import React, { useEffect } from "react";
import { Modal, Form, Button, Input, message } from "antd";
import { sendReqGet, sendReqPost, sendReqPut } from "services/api";
import { emp } from "configs/url.configs";
const EmpForm = ({ visible, empId, onClose }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.resetFields();
    if (empId) {
      getEmp();
    }
  }, [empId]);
  const getEmp = async () => {
    try {
      const res = await sendReqGet(`${emp.emps}/${empId}`);
      form.setFieldsValue(res.data);
    } catch (e) {
      message.error("Алдаа гарлаа!");
    }
  };
  const saveEmp = () => {
    form
      .validateFields()
      .then(async (values) => {
        if (empId) {
          await sendReqPut(emp.emps, { id: empId, ...values });
        } else {
          await sendReqPost(emp.emps, { id: empId, ...values });
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
      title={empId ? "Ажилтаны мэдээлэл засах" : "Ажилтаны мэдээлэл бүртгэх"}
      visible={visible}
      onCancel={() => onClose()}
      footer={[
        <Button key="back" onClick={() => onClose()}>
          Хаах
        </Button>,
        <Button key="submit" type="primary" onClick={() => saveEmp()}>
          Хадгалах
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Овог нэр"
          name="last_name"
          required
          tooltip="Зайлшгүй бөглөгдөх талбар"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Нэр"
          name="first_name"
          required
          tooltip="Зайлшгүй бөглөгдөх талбар"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Регистр"
          name="registr"
          required
          tooltip="Зайлшгүй бөглөгдөх талбар"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Төрсөн огноо"
          name="birthday"
          required
          tooltip="Зайлшгүй бөглөгдөх талбар"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Хүйс"
          name="gender"
          required
          tooltip="Зайлшгүй бөглөгдөх талбар"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Утасны дугаар"
          name="phone"
          required
          tooltip="Зайлшгүй бөглөгдөх талбар"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="И-мэйл хаяг"
          name="email"
          required
          tooltip="Зайлшгүй бөглөгдөх талбар"
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EmpForm;
