import { FR as FormRender } from '@jusda-tools/metadata-ui-render';
import styles from './FilterForm.less';


function FilterForm(props) {
  const { form, schema, ...options } = props;
  return (
    <div className={styles.FilterForm} style={{ minWidth: 420 }}>
      <div className={styles.formTitle}>编辑搜索条件</div>
      <FormRender
        {...options}
        form={form}
        schema={schema}
        maxWidth={452}
      />
    </div>
  );
}

export default FilterForm;
