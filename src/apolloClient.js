import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clh46qagr5b3901umbqn54cux/master',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2ODI5MTUzNjcsImF1ZCI6WyJodHRwczovL2FwaS11cy1lYXN0LTEtc2hhcmVkLXVzZWExLTAyLmh5Z3JhcGguY29tL3YyL2NsaDQ2cWFncjViMzkwMXVtYnFuNTRjdXgvbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQuZ3JhcGhjbXMuY29tLyIsInN1YiI6IjhmM2QwZWM5LWY1MWQtNDQ1ZC04ZTMwLWZjNzU4MjJjOGFjYyIsImp0aSI6ImNsaDRjY3dtZTViMzUwMXVtMWgyeTV5aTYifQ.wM6Bw_WGfMEUBfMRJkAvLhW2SAkAy4SNux5s8VcuPUS9dnEfCvLF9jTzc7zTGRLpVHfleqFrWEYvFTvX0XA7J4x1_F9eIMlVF9sbBHmnIJ16WWy_0761utp5lAx6U-7c81gjhKmMvIQd8Y028Bnlb7wErSUL1lY2DkUaPjr_yHUHjv-h-h0JpsGWtLIq9KU_VAUGi54IqiYtn-xXMHwQ_738pDU-QnOSuc-CXnlchTv8CR0ozpDhAAsvgBHUo1HajgY-ZpOmW0lh4HYpMGMPP4fu8eUz5unSP9zAGyeR2azp9UX-D8h2pFOXTCQiKhF7HxmkyCEEDWRPHDtWAlAH9vgvi1G8_BQeL7cYMRe0WsKZzaLNQTHqz8ogmJk4Zv9eYByfRtSkQnEhIyzgmnMzHmEm6cQA8jj7-OgDUdpc6vIhy7GHDatzg5xEgib2pQeYdVVJJpFzc7B6ucEISsc27e7N1BPQKaW3RDdauIUcurGq6T6FULxcEgjysH7RauP6Mj_geouH5Yq15ILkmAnU14FcGVJAPs3VXw3Xz5Zqidr9ihPk40sZxQayqX-Z6SvXoAEITr3Lv-cQFqWeqjYtHmo9vThETDnGQX4lVmv7HtKK29dQldlxRz8PUpLZq-BNSMZgXRswSA8Ki35hN1kZqol4IxmRS8UHYj1Slg6PTSg`,
  },
});

export default client;