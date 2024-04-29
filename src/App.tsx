import { ThemeProvider } from "@/components/theme-provider";
import Header from "./layouts/Header";
import TodoApp from "./features/TodoApp";

function App() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<main className="max-w-2xl mx-auto h-screen">
				<Header />
				<TodoApp />
			</main>
		</ThemeProvider>
	);
}

export default App;
