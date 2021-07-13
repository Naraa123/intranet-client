import React, { useEffect, useState } from "react";
import { Table, Popconfirm, Button, message, Space } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { pos } from "configs/url.configs";
import { sendReqDelete, sendReqGet } from "services/api";
import PosForm from "./Form";

const PosList = () => {
  const [state, setState] = useState({
    dataSources: [],
  });

  const [mod, setMod] = useState({ visible: false, posId: null });

  const getPos = async () => {
    const res = await sendReqGet(pos.position);
    setState({ dataSources: res.data });
  };

  useEffect(() => {
    getPos();
  }, []);

  const handleDelete = async (posId) => {
    try {
      await sendReqDelete(`${pos.position}?id=${posId}`);
      message.success("Мэдээллийг амжилттай устгалаа!");
      getPos();
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
              setMod({ visible: true, posId: val });
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
              <span>Албан тушаалын жагсаалт</span>
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
        style={{ paddingTop: "5px" }}
        bordered
        columns={columns}
        dataSource={state.dataSources}
      />
      <PosForm
        visible={mod.visible}
        posId={mod.posId}
        onClose={() => {
          setMod({ visible: false, posId: null });
          getPos();
        }}
      />
    </>
  );
};
export default PosList;
