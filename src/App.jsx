import { Keyboard } from './Keyboard'
import modules from './styles/app.module.css'

export const App = () => {
	return (
		<div className={modules.wrapper}>
			<Keyboard />
		</div>
	)
}