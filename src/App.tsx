import { ThemeProvider } from "@/contexts/theme-provider";
import Header from "./layouts/Header";
import TodoApp from "./features/TodoApp";

function App() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<main className="max-w-2xl mx-auto h-[100dvh]">
				<Header />
				<TodoApp />
			</main>
		</ThemeProvider>
	);
}

export default App;
