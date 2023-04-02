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
ll n,b[200200],a[200200];
int __gcd(int a, int b) { 
    if (b == 0) { 
        return a; 
    } 
    return __gcd(b, a % b); 
}
void solve()
{
    cin >> n;
    for(int i = 0;i<n-1;i++) cin >> b[i];
    a[0] = b[0];
    for (int i = 1; i < n - 1; i++) {
        a[i] = __gcd(b[i], b[i - 1]);
    }

    a[n - 1] = b[n - 2] / a[n - 2];

    for (int i = 0; i < n - 1; i++) {
        if (b[i] != __gcd(a[i], a[i + 1])) {
            cout << "-1\n";
            return ;
        }
    }
    bool ok = 1;
    
    if(ok) cout << "YES";
    else cout << "NO";
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
