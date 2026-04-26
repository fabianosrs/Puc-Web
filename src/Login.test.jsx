import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Login from './Login.jsx'

describe('Login', () => {
  it('exibe o titulo, campos e botao de acesso', () => {
    render(<Login />)

    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /acessar/i })).toBeInTheDocument()
  })

  it('inicia sem mensagem de retorno', () => {
    render(<Login />)

    expect(screen.queryByText(/acessado com sucesso/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/senha incorretos/i)).not.toBeInTheDocument()
  })

  it('atualiza o campo de email quando o usuario digita', async () => {
    const user = userEvent.setup()
    render(<Login />)

    const email = screen.getByLabelText(/email/i)
    await user.type(email, 'fabiano.marques@pucpr.br')

    expect(email).toHaveValue('fabiano.marques@pucpr.br')
  })

  it('atualiza o campo de senha quando o usuario digita', async () => {
    const user = userEvent.setup()
    render(<Login />)

    const senha = screen.getByLabelText(/senha/i)
    await user.type(senha, '123456')

    expect(senha).toHaveValue('123456')
  })

  it('mostra sucesso quando as credenciais estao corretas', async () => {
    const user = userEvent.setup()
    render(<Login />)

    await user.type(screen.getByLabelText(/email/i), 'fabiano.marques@pucpr.br')
    await user.type(screen.getByLabelText(/senha/i), '123456')
    await user.click(screen.getByRole('button', { name: /acessar/i }))

    expect(screen.getByText(/acessado com sucesso/i)).toBeInTheDocument()
  })

  it('mostra erro quando as credenciais estao incorretas', async () => {
    const user = userEvent.setup()
    render(<Login />)

    await user.type(screen.getByLabelText(/email/i), 'aluno@pucpr.br')
    await user.type(screen.getByLabelText(/senha/i), 'senha-errada')
    await user.click(screen.getByRole('button', { name: /acessar/i }))

    expect(screen.getByText(/senha incorretos/i)).toBeInTheDocument()
  })
})
