package br.com.exemplo.offlinefirst.pessoa;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PessoaService {

    private final PessoaRepository repository;

    public PessoaService(PessoaRepository repository) {
        this.repository = repository;
    }

    public Pessoa salvar(Pessoa pessoa) {
        return repository.findById(pessoa.getId())
                .orElseGet(() -> repository.save(pessoa));
    }

    public List<Pessoa> listar() {
        return repository.findAll();
    }
}
