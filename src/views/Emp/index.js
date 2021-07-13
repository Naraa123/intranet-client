import React, { useEffect, useState } from "react";
import { Table, Popconfirm, Button, message, Space } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { emp } from "configs/url.configs";
import { sendReqDelete, sendReqGet } from "services/api";
import PosForm from "./Form";

const EmpList = () => {
  const [state, setState] = useState({
    dataSources: [],
  });

  const [mod, setMod] = useState({ visible: false, empId: null });

  const getEmp = async () => {
    const res = await sendReqGet(emp.emps);
    setState({ dataSources: res.data });
  };

  useEffect(() => {
    getEmp();
  }, []);

  const handleDelete = async (empId) => {
    try {
      await sendReqDelete(`${emp.emps}?id=${empId}`);
      message.success("Мэдээллийг амжилттай устгалаа!");
      getEmp();
    } catch (error) {
      console.log(error.error, "----} error response");
      message.error(error);
    }
  };
  const columns = [
    {
      title: "Овог",
      dataIndex: "last_name",
      align: "left",
    },
    {
      title: "Нэр",
      dataIndex: "first_name",
      align: "left",
    },
    {
      title: "Регистр",
      dataIndex: "registr",
      align: "left",
    },
    {
      title: "Төрсөн огноо",
      dataIndex: "birthday",
      align: "left",
    },
    {
      title: "Хүйс",
      dataIndex: "gender",
      align: "left",
    },
    {
      title: "Утасны дугаар",
      dataIndex: "phone",
      align: "left",
    },
    {
      title: "И-мэйл хаяг",
      dataIndex: "email",
      align: "left",
    },
    {
      title: "Үйлдэл",
      dataIndex: "id",
      width: "20%",
      align: "center",
      render: (val) => (
        <>
          <Button
            type="link"
            onClick={() => {}}
            icon={<EditOutlined />}
            size="small"
            onClick={() => {
              setMod({ visible: true, empId: val });
            }}
          >
            Засах
          </Button>
          <Popconfirm
            title="Устгахдаа итгэлтэй байна уу"
            onConfirm={() => handleDelete(val)}
            okText="Тийм"
            cancelText="Үгүй"
          >
            <Button
              type="link"
              onClick={() => {}}
              icon={<DeleteOutlined />}
              size="small"
              danger
            >
              Устгах
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];
  return (
    <>
      <Table
        size="small"
        title={() => {
          return (
            <Space style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Ажилчдын жагсаалт</span>
              <Button
                size="small"
                type="link"
                icon={<PlusCircleOutlined />}
                onClick={() => setMod({ visible: true })}
              >
                Нэмэх
              </Button>
            </Space>
          );
        }}
        bordered
        columns={columns}
        dataSource={state.dataSources}
      />
      <PosForm
        visible={mod.visible}
        empId={mod.empId}
        onClose={() => {
          setMod({ visible: false, empId: null });
          getEmp();
        }}
      />
    </>
  );
};
export default EmpList;
