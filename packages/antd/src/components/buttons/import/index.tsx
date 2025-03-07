import React, { ReactNode } from "react";
import { Button, ButtonProps, Upload, UploadProps } from "antd";
import { ImportOutlined } from "@ant-design/icons";
import { useTranslate } from "@pankod/refine-core";
import {
    RefineImportButtonProps,
    RefineButtonTestIds,
} from "@pankod/refine-ui-types";

export type ImportButtonProps = RefineImportButtonProps & {
    /**
     * Sets the button type
     * @type [UploadProps](https://ant.design/components/upload/#API)
     */
    uploadProps: UploadProps;
    /**
     * Sets props of the button
     * @type [ButtonProps](https://ant.design/components/button/#API)
     */
    buttonProps: ButtonProps;
};

/**
 * `<ImportButton>` is compatible with the {@link https://refine.dev/docs/ui-frameworks/antd/hooks/import/useImport `useImport`} hook and is meant to be used as it's upload button.
 * It uses Ant Design's {@link https://ant.design/components/button/ `<Button>`} and {@link https://ant.design/components/upload/ `<Upload>`} components.
 * It wraps a `<Button>` component with an `<Upload>` component and accepts properties for `<Button>` and `<Upload>` components separately.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/buttons/import-button} for more details.
 */
export const ImportButton: React.FC<ImportButtonProps> = ({
    uploadProps,
    buttonProps,
    hideText = false,
    children,
}) => {
    const translate = useTranslate();

    return (
        <Upload {...uploadProps}>
            <Button
                icon={<ImportOutlined />}
                data-testid={RefineButtonTestIds.ImportButton}
                {...buttonProps}
            >
                {!hideText &&
                    (children ?? translate("buttons.import", "Import"))}
            </Button>
        </Upload>
    );
};
