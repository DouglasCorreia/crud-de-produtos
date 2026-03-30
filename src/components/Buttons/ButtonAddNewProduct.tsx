import { FaPlus } from "react-icons/fa";
import { Button, Flex } from 'antd';

type CreateButtonProps = {
  onCreate: () => void;
};

function ButtonAddNewProduct({ onCreate }: CreateButtonProps) {
    return (
        <>
            <Flex gap="medium" align="center" className="create-button">
                <Button type="primary" onClick={onCreate}>
                    <FaPlus />

                    Adicionar novo produto
                </Button>
            </Flex>
        </>
    )
}

export default ButtonAddNewProduct;