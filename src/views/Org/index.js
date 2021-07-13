import React, { useEffect, useState } from "react";
import { Table, Popconfirm, Button, message, Space } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { org } from "configs/url.configs";
import { sendReqDelete, sendReqGet } from "services/api";
import OrgForm from "./Form";
const OrgList = () => {
  const [state, setState] = useState({
    dataSrouce: [],
  });

  const [mod, setMod] = useState({ visible: false, orgId: null });

  const getOrgs = async () => {
    const res = await sendReqGet(org.orgs);
    setState({ dataSrouce: res.data });
  };

  useEffect(() => {
    getOrgs();
  }, []);

  const handleDelete = async (orgId) => {
    try {
      await sendReqDelete(`${org.orgs}?id=${orgId}`);
      message.success("Мэдээллийг амжилттай устгалаа!");
      getOrgs();
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
      title: "Захирал",
      dataIndex: "ceo_name",
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
              setMod({ visible: true, orgId: val });
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
              <span>Байгууллагын жагсаалт</span>
              <Button
                size="small"
                type="link"
                icon={<PlusCircleOutlined />}
                onClick={() => setMod({ visible: true })}
              >
                Байгууллага нэмэх
              </Button>
            </Space>
          );
        }}
        bordered
        columns={columns}
        dataSource={state.dataSrouce}
      />
      <OrgForm
        visible={mod.visible}
        orgId={mod.orgId}
        onClose={() => {
          setMod({ visible: false, orgId: null });
          getOrgs();
        }}
      />
    </>
  );
};
export default OrgList;
