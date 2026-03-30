import { Form, Input, InputNumber, DatePicker } from 'antd';
import type { FormInstance } from 'antd';

type FormProductProps = {
  form: FormInstance;
};

function FormProduct({ form }: FormProductProps) {
  return (
    <>
        <Form form={form} layout="vertical">
            <Form.Item name="nome" label="Nome" rules={[{ required: true, message: "O nome é obrigatório" }]}>
                <Input />
            </Form.Item>

            <Form.Item name="quantidade" label="Quantidade" rules={[{ required: true, message: "A quantidade é obrigatório" }]}>
                <InputNumber style={{ width: '100%' }} min={0} />
            </Form.Item>

            <Form.Item name="endereco" label="Localização" rules={[{ required: true, message: "A localização é obrigatória" }]}>
                <Input />
            </Form.Item>

            <Form.Item name="armazem" label="Armazém" rules={[{ required: true, message: "O armazém é obrigatório" }]}>
                <Input />
            </Form.Item>

            <Form.Item name="validade" label="Validade" >
                <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
            </Form.Item>

            <Form.Item name="lote" label="Lote" rules={[{ required: true, message: "O lote é obrigatório" }]}>
                <Input />
            </Form.Item>
        </Form>
    </>
  );
}

export default FormProduct;