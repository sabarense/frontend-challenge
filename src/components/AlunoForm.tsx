import React, { useState } from "react";
import { AlunoRequestDTO } from "../models/AlunoRequestDTO";
import { criarAluno } from "../services/alunoService";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
} from "@mui/material";

const AlunoForm = () => {
  const [notas, setNotas] = useState<number[]>([]);
  const [frequencia, setFrequencia] = useState<number>(0);
  const [nome, setNome] = useState<string>("");

  const validarAluno = () => {
    if (!nome || nome.trim() === "") {
      alert("Nome do aluno é obrigatório");
      return false;
    }
    if (notas.some((nota) => nota < 0 || nota > 10)) {
      alert("As notas devem ser valores entre 0 e 10");
      return false;
    }
    if (frequencia < 0 || frequencia > 100) {
      alert("A frequência deve ser um valor entre 0 e 100");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarAluno()) return;

    const aluno: AlunoRequestDTO = { nome, notas, frequencia };
    try {
      await criarAluno(aluno);
      alert("Aluno criado com sucesso!");
      setNome("");
      setNotas([]);  
      setFrequencia(0);  
    } catch (error) {
      console.error("Erro ao criar aluno", error);
      alert("Ocorreu um erro ao criar o aluno");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: 2,
      }}
    >
      <Card sx={{ maxWidth: 500, width: "100%" }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Informações do aluno
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Nome"
                  variant="outlined"
                  fullWidth
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Notas</Typography>
                {Array(5).fill(null).map((_, index) => (
                  <Grid item xs={12} key={index}>
                    <TextField
                      label={`Nota na disciplina ${index + 1}`}
                      variant="outlined"
                      type="number"
                      fullWidth
                      value={notas[index] !== undefined ? notas[index] : ""}
                      onChange={(e) => {
                        const newNotas = [...notas];
                        newNotas[index] = parseFloat(e.target.value) || 0;
                        setNotas(newNotas);
                      }}
                      required
                      InputProps={{
                        inputProps: {
                          step: 0.1,
                          min: 0,
                          max: 10,
                        },
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Frequência (%)"
                  variant="outlined"
                  type="number"
                  fullWidth
                  value={frequencia !== undefined ? frequencia : ""}
                  onChange={(e) => setFrequencia(Number(e.target.value) || 0)}
                  required
                  InputProps={{
                    inputProps: {
                      step: 0.1,
                      min: 0,
                      max: 100,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" fullWidth type="submit">
                  Criar Aluno
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AlunoForm;
