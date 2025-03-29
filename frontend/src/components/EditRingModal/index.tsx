import { useEffect } from 'react';

import { Form, Input, Modal, Select, Spin } from 'antd';
import { useGetRingById } from '../../api/useGetRingById.api';
import { useUpdateRing } from '../../api/useUpdateRing.api';
import { EBearer, EBearerDict } from '../../utils/enuns/e-bearer';

interface Props {
  ringId: number;
  open: boolean;
  onClose: () => void;
}

export default function EditRingModal({ open, onClose, ringId }: Props) {
  const { data: ring, isLoading } = useGetRingById(ringId);
  const { mutate: updateRing, isPending } = useUpdateRing();

  const [form] = Form.useForm();

  useEffect(() => {
    if (ring) {
      form.setFieldsValue(ring);
    }
  }, [ring, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        updateRing({ ...values, id: ringId });
        onClose();
      })
      .catch((info) => {
        console.log('Validation Failed:', info);
      });
  };

  return (
    <Modal
      title="Editar Anel"
      open={open}
      onOk={handleOk}
      onCancel={() => onClose()}
      okText="Editar"
      cancelText="Cancelar"
      okButtonProps={{ loading: isPending }}
    >
      <Spin spinning={isLoading}>
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Nome do Anel:"
            rules={[
              { required: true, message: 'Por favor, insira o nome do anel!' },
            ]}
          >
            <Input placeholder="Escrever..." />
          </Form.Item>
          <Form.Item
            name="power"
            label="Poder do Anel:"
            rules={[{ required: true, message: 'Por favor, insira o poder!' }]}
          >
            <Input placeholder="Escrever..." />
          </Form.Item>

          <Form.Item
            name="bearer"
            label="Selecione um portador:"
            rules={[
              { required: true, message: 'Por favor, selecione um portador!' },
            ]}
          >
            <Select>
              <Select.Option value={EBearer.dwarves}>
                {EBearerDict[EBearer.dwarves]}
              </Select.Option>
              <Select.Option value={EBearer.elves}>
                {EBearerDict[EBearer.elves]}
              </Select.Option>
              <Select.Option value={EBearer.men}>
                {EBearerDict[EBearer.men]}
              </Select.Option>
              <Select.Option value={EBearer.saurs}>
                {EBearerDict[EBearer.saurs]}
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="forged"
            label="Forjado por:"
            rules={[
              { required: true, message: 'Por favor, insira o forjador!' },
            ]}
          >
            <Input placeholder="Escrever..." />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
}
