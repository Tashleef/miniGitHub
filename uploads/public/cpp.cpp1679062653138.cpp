#include<bits/stdc++.h>
typedef long long int ll;
using namespace std;
typedef vector <ll> Row;
typedef vector <Row> Matrix;
#define T while(t--)
#define TASHLEEF ios_base::sync_with_stdio(false); cin.tie(0); cout.tie(0);
#define all(x) x.begin() , x.end()
#define debv(v) for(auto p : v) cout << p << " ";
#define deb(x) cout << #x << " = " << x << " ";
#define f(i,n) for(i;i<n;i++)
#define endl '\n'
#define LFT 2*p, L, (L+R)/2
#define RGT 2*p+1, (L+R)/2+1, R
#define PI 3.14159265
#define pb push_back
int const N = 1000100;
int const MOD = 1e9+7;
ll n,a[1<<22],F[1<<22],po[1<<22],Lg[1<<22];
void solve()
{
    cin >> n;
    int x;
    int num = (1<<20)-1;
    for(int i = 0;i<n;i++)cin >> x,a[x]++;
    int N1 = 20;
    for(int i = 0; i<(1<<N1); ++i)
	F[i] = a[i];
   for(int i=0 ; i<N1 ; i++)
      for(int msk=1<<N1 ; msk-- ; )
         if(~msk&1<<i) F[msk] += F[msk^1<<i];

	int mask = 10;
	int smask = ~mask;
	for(int i = 0;i<=N1;i++){
		cout << ((mask&(1<<i)) != 0);
	}
	cout << endl;
	
	for(int i = 0;i<=N1;i++){
		cout << ((smask&(1<<i)) != 0);
	}
	cout << endl;
	cout << mask << " " << smask << endl;
    po[0] = 1;
    for(int i = 1;i<num;i++)
        po[i] = (1LL * po[i-1])%MOD*2,Lg[i] += Lg[i/2] + (i&1);

    ll ans = 0;
    for(int i = 0;i<num;i++)
    {
        ll sign = (Lg[i]&1)?-1:1;
        ans = ans+MOD+1LL*sign*(po[F[i]]-1);
        ans += MOD;
        ans %= MOD;
    }
    cout << ans;
}
int main()
{
    int t = 1;
    //cin >> t;
    while(t--)
    {
        solve();
        cout << endl;
    }
}
