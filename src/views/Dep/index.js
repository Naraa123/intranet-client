import React, { useEffect, useState } from "react";
import { Table, Popconfirm, Button, message, Space } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { dep } from "configs/url.configs";
import { sendReqDelete, sendReqGet } from "services/api";
import DepForm from "./Form";

const DepList = () => {
  const [state, setState] = useState({
    dataSrouce: [],
  });

  const [mod, setMod] = useState({ visible: false, depId: null });

  const getDeps = async () => {
    const res = await sendReqGet(dep.deps);
    setState({ dataSrouce: res.data });
  };

  useEffect(() => {
    getDeps();
  }, []);

  const handleDelete = async (depId) => {
    try {
      await sendReqDelete(`${dep.deps}?id=${depId}`);
      message.success("Мэдээллийг амжилттай устгалаа!");
      getDeps();
    } catch (error) {
      console.log(error.error, "----} error response");
      message.error(error);
    }
  };
  const columns = [
    {
      title: "Нэр",
      dataIndex: "name",
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
              setMod({ visible: true, depId: val });
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
              <span>Хэлтэсийн жагсаалт</span>
              <Button
                size="small"
                type="link"
                icon={<PlusCircleOutlined />}
                onClick={() => setMod({ visible: true })}
              >
                Хэлтэс нэмэх
              </Button>
            </Space>
          );
        }}
        bordered
        columns={columns}
        dataSource={state.dataSrouce}
      />
      <DepForm
        visible={mod.visible}
        depId={mod.depId}
        onClose={() => {
          setMod({ visible: false, depId: null });
          getDeps();
        }}
      />
    </>
  );
};
export default DepList;
