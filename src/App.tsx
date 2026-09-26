import { LayoutProvider } from './contextos/LayoutContexto'
import { Rotas } from './rotas/Rotas'

function App() {
  return (
    <LayoutProvider>
      <Rotas />
    </LayoutProvider>
  )
}

export default App
