import { Grid, Loader } from 'semantic-ui-react'
export default function Loading() {
  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Loader size='large' active>
          <img src='https://i.imgur.com/UbwTRC5.gif'/>
        </Loader>
      </Grid.Column>
    </Grid>
  );
}