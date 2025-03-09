import { FC } from 'react';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useThemeValues } from '../../../providers/ThemeProvider/useTheme';
import { convertToCSV } from '../../../shared/convertToCSV';
import { IPeople } from '../../../types/resultAPI.interface';
import ListItem from '../../Result/CardList/ListItem/ListItem';
import styles from './SelectedItems.module.scss';
const SelectedItems: FC = () => {
	const { markedPeoples } = useTypedSelector(({ people }) => people);
	const { removeItems } = useActions();
	const isDisabled = markedPeoples.length;
	const theme = useThemeValues()

	const downloadCSV = (peoples: IPeople[]) => {
		const csvContent = convertToCSV(peoples);
		const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

		const link = document.createElement('a');
		const fileName = `${peoples.length}_episodes.csv`;
		link.href = URL.createObjectURL(blob);
		link.download = fileName;
		link.click();
	};

	return (
		<>
			{!!isDisabled && (
				<section className={styles.selected} data-theme={theme === 'light' ? 'light' : 'dark'}>
					<div className={styles.header}>
						<h3 className={styles.title}>
							Selected {markedPeoples.length} Items:
						</h3>
						<div className={styles.buttons}>
							<button
								className={styles.unselect}
								disabled={!isDisabled}
								onClick={() => removeItems()}
							>
								Unselect all
							</button>
							<button
								className={styles.download}
								disabled={!isDisabled}
								onClick={() => downloadCSV(markedPeoples)}
							>
								Download
							</button>
						</div>
					</div>
					<div className={styles.list}>
						{markedPeoples.map((item) => (
							<ListItem key={item.url} item={item} />
						))}
					</div>
				</section>
			)}
		</>
	);
};

export default SelectedItems;
