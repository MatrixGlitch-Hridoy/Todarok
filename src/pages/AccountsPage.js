import { Container, Stack, Typography } from "@mui/material";

export default function AccountPage() {
  return (
    <>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Accounts
          </Typography>
        </Stack>
      </Container>
    </>
  );
}
