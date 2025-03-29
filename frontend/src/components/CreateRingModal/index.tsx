import { Form, Input, Modal, Select } from 'antd';
import { useCreateRing } from '../../api/useCreateRing.api';
import { EBearer, EBearerDict } from '../../utils/enuns/e-bearer';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CreateRingModal({ open, onClose }: Props) {
  const [form] = Form.useForm();

  const { mutate: createRing, isPending } = useCreateRing();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        createRing(values);
        onClose();
      })
      .catch((info) => {
        console.log('Validation Failed:', info);
      });
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <>
      <Modal
        title="Criar Anel"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Criar"
        cancelText="Cancelar"
        okButtonProps={{ loading: isPending }}
      >
        <Form
          form={form}
          initialValues={{
            name: '',
            power: '',
            bearer: 0,
            forged: '',
          }}
          layout="vertical"
        >
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
              <Select.Option value={0}>Selecione um portador</Select.Option>
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
      </Modal>
    </>
  );
}
