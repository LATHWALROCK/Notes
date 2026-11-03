import Code from '../../components/Code.jsx';

export default function Mathematics() {
  return (
    <>
      {/* 1. Divisors of a Number */}
      <div id="divisors-of-a-number" data-topic-boundary="true" />
      <p className="page-sub">
        Every number&apos;s divisors come in pairs that multiply back to it &mdash; a fact that cuts the search
        space from linear all the way down to a square root.
      </p>
      <div className="meta-row">
        <span className="pill">GeeksforGeeks</span>
        <span className="pill pill-success">Easy</span>
        <span className="pill">Divisors pair up around &radic;n</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Given a positive integer <code>n</code>, find (or print, in increasing
          order) every divisor of <code>n</code>.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 If <code>i</code> divides <code>n</code>, so does <code>n / i</code></div>
          <p>
            Checking every integer from <code>1</code> to <code>n</code> is correct but wasteful. The
            moment some <code>i &le; &radic;n</code> is found to divide <code>n</code> evenly, its{' '}
            <strong>partner</strong> <code>n / i</code> is automatically a divisor too &mdash; there is no
            need to separately test it. So it&apos;s enough to scan <code>i</code> only up to{' '}
            <code>&radic;n</code>, recording both <code>i</code> and <code>n / i</code> at every hit.
            The one case to watch for is a <strong>perfect square</strong>, where{' '}
            <code>i == n / i</code> at the exact midpoint &mdash; recording it twice would be a bug, not
            a feature.
          </p>
          <div className="recurrence">{`divisors = []
for i = 1 to ⌊√n⌋:
    if n % i == 0:
        divisors.add(i)
        if i != n / i:
            divisors.add(n / i)
sort(divisors)`}</div>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ <code>i * i &le; n</code>, not <code>i &le; Math.sqrt(n)</code></div>
          Comparing against a freshly computed <code>Math.sqrt(n)</code> inside the loop condition invites
          floating-point rounding errors right at the boundary (a perfect square like{' '}
          <code>49</code> can come back as <code>6.9999999</code> from <code>Math.sqrt</code>, silently
          skipping <code>i = 7</code>). Comparing <code>(long) i * i &le; n</code> instead stays in exact
          integer arithmetic the whole way through.
        </div>
      </div>
      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Solution {
    public List<Integer> printDivisors(int n) {
        List<Integer> divisors = new ArrayList<>();
        for (int i = 1; (long) i * i <= n; i++) {
            if (n % i == 0) {
                divisors.add(i);
                if (i != n / i) {
                    divisors.add(n / i);
                }
            }
        }
        Collections.sort(divisors);
        return divisors;
    }
}`}</Code>
      <div className="sub-header">
        <h3>Dry run</h3>
      </div>
      <pre className="diagram">{`  n = 36 ,  ⌊√36⌋ = 6

  i=1: 36%1==0 -> add 1, add 36/1=36
  i=2: 36%2==0 -> add 2, add 18
  i=3: 36%3==0 -> add 3, add 12
  i=4: 36%4==0 -> add 4, add 9
  i=5: 36%5!=0 -> skip
  i=6: 36%6==0 -> add 6, and 36/6=6 too -> i == n/i, add ONLY ONCE

  collected: {1,36,2,18,3,12,4,9,6} -> sorted: 1,2,3,4,6,9,12,18,36`}</pre>
      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time</div>
          <div className="cx-val">O(&radic;n + k log k)</div>
          <div className="cx-note">k divisors found, then sorted; the scan itself is O(&radic;n).</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space</div>
          <div className="cx-val">O(k)</div>
          <div className="cx-note">Only the output list; k is the divisor count.</div>
        </div>
      </div>

      {/* 2. Check if a Number is Prime */}
      <div id="check-if-a-number-is-prime" data-topic-boundary="true" />
      <p className="page-sub">
        The exact same square-root insight from Divisors of a Number, turned into a yes/no question: a
        composite number is always guaranteed to have a factor at or below its own square root.
      </p>
      <div className="meta-row">
        <span className="pill">GeeksforGeeks</span>
        <span className="pill pill-success">Easy</span>
        <span className="pill">No factor below &radic;n means no factor at all</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Given a positive integer <code>n</code>, determine whether it is prime
          (has exactly two distinct positive divisors: <code>1</code> and itself).
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 If n is composite, it has a divisor &le; &radic;n</div>
          Suppose <code>n = a &times; b</code> with both <code>a, b &gt; 1</code>. If <em>both</em>{' '}
          <code>a</code> and <code>b</code> were strictly greater than <code>&radic;n</code>, their product
          would exceed <code>n</code> &mdash; a contradiction. So at least one of them is{' '}
          <code>&le; &radic;n</code>. That means checking divisibility only up to{' '}
          <code>&radic;n</code> is enough to rule out every composite number; nothing beyond that point
          could possibly be hiding a <em>first</em> factor.
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ <code>n &le; 1</code> is never prime, and <code>n == 2</code> is the only even prime</div>
          These two edge cases are easy to get wrong in a hurry: <code>1</code> has only one divisor
          (itself), not two, so it&apos;s excluded by definition; and while every other even number is
          automatically composite (divisible by <code>2</code>), <code>2</code> itself is prime.
        </div>
      </div>
      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Solution {
    public boolean isPrime(int n) {
        if (n <= 1) {
            return false;
        }
        for (int i = 2; (long) i * i <= n; i++) {
            if (n % i == 0) {
                return false;
            }
        }
        return true;
    }
}`}</Code>
      <div className="callout callout-tip">
        <div className="callout-title">💡 Checking 2 separately then stepping by 2 halves the remaining work</div>
        Once <code>n % 2 != 0</code> has been confirmed, every subsequent even divisor is impossible &mdash;
        so the loop can start at <code>3</code> and step by <code>2</code>, testing only odd candidates.
        This is a constant-factor speedup, not a different complexity class, but it&apos;s a common and
        worthwhile refinement: <code>for (int i = 3; (long) i * i &lt;= n; i += 2)</code>, with an upfront{' '}
        <code>if (n % 2 == 0) return n == 2;</code>.
      </div>
      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time</div>
          <div className="cx-val">O(&radic;n)</div>
          <div className="cx-note">Stops the instant a factor at or below &radic;n is found.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space</div>
          <div className="cx-val">O(1)</div>
          <div className="cx-note">Constant space.</div>
        </div>
      </div>

      {/* 3. Prime Factors of a Number */}
      <div id="prime-factors-of-a-number" data-topic-boundary="true" />
      <p className="page-sub">
        Rather than testing every candidate divisor against the original <code>n</code>, actively{' '}
        <strong>remove</strong> each factor as it&apos;s found &mdash; which keeps the remaining number shrinking
        and makes the square-root bound apply to an ever-smaller target.
      </p>
      <div className="meta-row">
        <span className="pill">GeeksforGeeks</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Divide out every occurrence of a factor before moving on</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Given a positive integer <code>n</code>, print its prime factorisation
          &mdash; every prime factor, repeated as many times as it divides <code>n</code>.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Dividing out a factor shrinks n, so the sqrt bound tightens as you go</div>
          <p>
            Walk candidates <code>i</code> from <code>2</code> upward. Whenever <code>i</code> divides
            the <strong>current</strong> (shrinking) value of <code>n</code>, keep dividing it out and
            recording <code>i</code> as a factor, as many times as it fits &mdash; this automatically
            skips composite candidates, since any composite <code>i</code> would already have had its own
            prime factors divided out of <code>n</code> earlier in the loop, long before <code>i</code>{' '}
            itself was reached. The loop only needs to run while{' '}
            <code>i &times; i &le; n</code>; if anything is left over once it ends, that leftover value
            is itself one final prime factor (it can have at most one prime factor remaining, since
            every smaller one has already been removed).
          </p>
          <div className="recurrence">{`i = 2
while i * i ≤ n:
    while n % i == 0:
        print i
        n = n / i
    i = i + 1
if n > 1: print n        -- whatever is left is prime itself`}</div>
        </div>
        <div className="callout callout-note">
          <div className="callout-title">📌 Why composite candidates never cause a false factor</div>
          Suppose <code>i = 6</code> is reached. By then, every factor of <code>2</code> and every factor
          of <code>3</code> has already been fully divided out of <code>n</code> (since <code>2</code> and{' '}
          <code>3</code> were visited earlier). <code>6</code> can only divide what&apos;s left of{' '}
          <code>n</code> if both a <code>2</code> and a <code>3</code> are still present &mdash; which is
          impossible by construction. So <code>n % 6 == 0</code> can never trigger at this point; the inner{' '}
          <code>while</code> loop simply does nothing for every composite <code>i</code>, at the cost of
          one wasted modulo check.
        </div>
      </div>
      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Solution {
    public List<Integer> primeFactors(int n) {
        List<Integer> factors = new ArrayList<>();
        for (int i = 2; (long) i * i <= n; i++) {
            while (n % i == 0) {
                factors.add(i);
                n /= i;
            }
        }
        if (n > 1) {
            factors.add(n);
        }
        return factors;
    }
}`}</Code>
      <div className="sub-header">
        <h3>Dry run</h3>
      </div>
      <pre className="diagram">{`  n = 360

  i=2: 360%2=0 -> factor 2, n=180
       180%2=0 -> factor 2, n=90
       90%2=0  -> factor 2, n=45
       45%2!=0 -> move on
  i=3: 45%3=0  -> factor 3, n=15
       15%3=0  -> factor 3, n=5
       5%3!=0  -> move on
  i=4: 4*4=16 ≤ 5? no -> loop ends (i*i now exceeds remaining n)

  n=5 > 1 -> one final factor: 5

  360 = 2 × 2 × 2 × 3 × 3 × 5`}</pre>
      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time</div>
          <div className="cx-val">O(&radic;n)</div>
          <div className="cx-note">The outer loop bound shrinks along with n, but never exceeds &radic;(original n).</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space</div>
          <div className="cx-val">O(log n)</div>
          <div className="cx-note">At most log&#8322;n factors can be collected.</div>
        </div>
      </div>

      {/* 4. Power / Fast Exponentiation */}
      <div id="power-exponentiation" data-topic-boundary="true" />
      <p className="page-sub">
        Computing <code>x&#8319;</code> one multiplication at a time costs <code>n</code> multiplications.
        Repeated <strong>squaring</strong> gets the exponent itself to behave like a binary search, cutting
        that down to <code>log n</code>.
      </p>
      <div className="meta-row">
        <span className="pill">GeeksforGeeks</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">x&#8319; = (x&sup2;)&#8319;&frasl;&sup2; &mdash; halve the exponent, square the base</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Given a base <code>x</code> and a non-negative integer exponent{' '}
          <code>n</code>, compute <code>x&#8319;</code> efficiently.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 An even exponent splits cleanly in half; an odd one peels off one factor first</div>
          <p>
            If <code>n</code> is even, <code>x&#8319; = (x &times; x)<sup>n/2</sup></code> &mdash; squaring
            the base and halving the exponent computes the exact same value with one multiplication
            instead of two separate recursive branches. If <code>n</code> is odd, peel off a single
            factor of <code>x</code> first, then apply the same even-case trick to the remaining{' '}
            <code>n - 1</code>: <code>x&#8319; = x &times; (x &times; x)<sup>(n-1)/2</sup></code>. Either
            way, the exponent is roughly halved every step, giving <code>O(log n)</code> total
            multiplications instead of <code>O(n)</code>.
          </p>
          <div className="recurrence">{`power(x, n):
    if n == 0: return 1
    if n is even: return power(x * x, n / 2)
    return x * power(x * x, (n - 1) / 2)`}</div>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ A negative exponent needs <code>x = 1/x</code>, flipped once up front</div>
          <code>x&#8315;&#8319; = (1/x)&#8319;</code>. The cleanest way to handle this is to detect a
          negative <code>n</code> once, before the loop even starts: negate <code>n</code> and invert{' '}
          <code>x</code> (<code>x = 1.0 / x</code>), then run the exact same positive-exponent logic
          unchanged.
        </div>
      </div>
      <div className="sub-header">
        <h3>Code Implementation &mdash; Iterative</h3>
      </div>
      <div className="card">
        <p>
          The iterative form avoids any recursion: walk the exponent&apos;s bits from least significant to most
          significant, squaring the base every step and folding it into the answer only on the bits that
          are actually set to <code>1</code>.
        </p>
      </div>
      <Code>{`class Solution {
    public double myPow(double x, int n) {
        long nn = n;
        if (nn < 0) {
            x = 1.0 / x;
            nn = -nn;
        }

        double ans = 1.0;
        while (nn > 0) {
            if ((nn & 1) == 1) {
                ans *= x;      // this bit is set; fold the current power of x in
                nn -= 1;
            } else {
                x *= x;        // square the base
                nn /= 2;
            }
        }
        return ans;
    }
}`}</Code>
      <div className="sub-header">
        <h3>Code Implementation &mdash; Recursive</h3>
      </div>
      <Code>{`class Solution {
    private double fastPow(double x, long n) {
        if (n == 0) {
            return 1.0;
        }
        double half = fastPow(x, n / 2);
        double result = half * half;
        if (n % 2 == 1) {
            result *= x;
        }
        return result;
    }

    public double myPow(double x, int n) {
        long nn = n;
        if (nn < 0) {
            x = 1.0 / x;
            nn = -nn;
        }
        return fastPow(x, nn);
    }
}`}</Code>
      <div className="callout callout-note">
        <div className="callout-title">📌 Modular exponentiation is the same trick, with one extra step</div>
        A very common variant asks for <code>x&#8319; mod m</code> (needed whenever the true value of{' '}
        <code>x&#8319;</code> would be astronomically large, e.g. competitive programming). The identical
        repeated-squaring structure works unchanged &mdash; just take <code>% m</code> after every
        multiplication, so the intermediate values never grow beyond what a <code>long</code> can safely
        hold before the next multiplication.
      </div>
      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time</div>
          <div className="cx-val">O(log n)</div>
          <div className="cx-note">The exponent roughly halves every step.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space</div>
          <div className="cx-val">O(1) iterative, O(log n) recursive</div>
          <div className="cx-note">The recursive version pays for its call stack.</div>
        </div>
      </div>

      {/* 5. Sieve of Eratosthenes */}
      <div id="sieve-of-eratosthenes" data-topic-boundary="true" />
      <hr className="part-rule" />
      <div className="part-kicker">Sieves &mdash; Answering the Same Question for Every Number at Once</div>
      <p className="part-blurb">
        Checking one number for primality costs <code>O(&radic;n)</code>. The moment the same question needs
        answering for <strong>every</strong> number up to some limit, it becomes far cheaper to compute all
        the answers together, in one pass, than to repeat a per-number check over and over.
      </p>

      <p className="page-sub">
        Instead of asking &quot;is this number prime?&quot; one number at a time, flip the question around: starting
        from every prime found so far, cross out everything it divides.
      </p>
      <div className="meta-row">
        <span className="pill">GeeksforGeeks / LeetCode 204</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Every composite gets crossed out by its smallest prime factor</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Given a limit <code>n</code>, find (or mark) every prime number from{' '}
          <code>2</code> up to <code>n</code>.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 The first un-crossed number at any point must be prime</div>
          <p>
            Start with every number from <code>2</code> to <code>n</code> marked as &quot;possibly prime.&quot;
            Walk <code>i</code> from <code>2</code> upward: whenever <code>i</code> is still marked
            prime, every multiple of <code>i</code> starting from <code>i&sup2;</code>{' '}
            (<code>i&sup2;, i&sup2;+i, i&sup2;+2i, &hellip;</code>) is definitely composite &mdash; cross
            all of them out. Starting the crossing-out at <code>i&sup2;</code> rather than{' '}
            <code>2i</code> is a genuine optimisation, not just style: any smaller multiple of{' '}
            <code>i</code> (like <code>2i</code>, <code>3i</code>, &hellip;, <code>(i-1)i</code>) already
            got crossed out earlier, by whichever smaller prime factor it has.
          </p>
          <div className="recurrence">{`isPrime = array of true, size n+1
isPrime[0] = isPrime[1] = false

for i = 2 to ⌊√n⌋:
    if isPrime[i]:
        for j = i*i to n step i:
            isPrime[j] = false`}</div>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ <code>i * i</code> can overflow a 32-bit int for a large enough n</div>
          If <code>n</code> is close to <code>Integer.MAX_VALUE</code>, the starting point{' '}
          <code>i * i</code> computed as a plain <code>int</code> can wrap around to a negative number,
          corrupting the inner loop entirely. Computing it as <code>(long) i * i</code> (or simply bounding{' '}
          <code>n</code> well below that range, which every practical use of this sieve does) avoids the
          problem.
        </div>
      </div>
      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Solution {
    public boolean[] sieve(int n) {
        boolean[] isPrime = new boolean[n + 1];
        Arrays.fill(isPrime, true);
        if (n >= 0) isPrime[0] = false;
        if (n >= 1) isPrime[1] = false;

        for (int i = 2; (long) i * i <= n; i++) {
            if (isPrime[i]) {
                for (long j = (long) i * i; j <= n; j += i) {
                    isPrime[(int) j] = false;
                }
            }
        }
        return isPrime;
    }
}`}</Code>
      <div className="sub-header">
        <h3>Dry run</h3>
      </div>
      <pre className="diagram">{`  n = 30

  start:  2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30
          all marked "possibly prime"

  i=2 (prime): cross out 4,6,8,10,12,14,16,18,20,22,24,26,28,30
  i=3 (prime): cross out 9,15,21,27             (6,12,18,24,30 already gone)
  i=4: already crossed out -> skip entirely
  i=5: 5*5=25 ≤ 30 -> cross out 25             (10,15,20 already gone)
  i=6: 6*6=36 > 30 -> loop ends

  primes left standing: 2,3,5,7,11,13,17,19,23,29`}</pre>
      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time</div>
          <div className="cx-val">O(n log log n)</div>
          <div className="cx-note">Each prime p crosses out roughly n/p numbers; summed over all primes, this converges to n&middot;log log n.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space</div>
          <div className="cx-val">O(n)</div>
          <div className="cx-note">One boolean per number up to n.</div>
        </div>
      </div>

      {/* 6. Count Primes in a Range [L, R] */}
      <div id="count-primes-in-a-range" data-topic-boundary="true" />
      <p className="page-sub">
        A plain sieve up to <code>R</code> works, but wastes memory when <code>R</code> is huge and{' '}
        <code>L</code> is close to it &mdash; the <strong>segmented</strong> sieve only ever allocates space
        for the range actually being asked about.
      </p>
      <div className="meta-row">
        <span className="pill">GeeksforGeeks / Codeforces</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">Only primes up to &radic;R can ever mark a composite inside [L, R]</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Given a range <code>[L, R]</code>, count (or list) every prime number
          inside it, where <code>R</code> can be very large (too large to comfortably allocate an{' '}
          <code>R</code>-sized boolean array) but <code>R - L</code> is manageable.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Any composite in [L, R] has a prime factor &le; &radic;R</div>
          <p>
            Exactly the same square-root argument from Check if a Number is Prime applies here: a
            composite number <code>x &le; R</code> is guaranteed to have a prime factor{' '}
            <code>&le; &radic;x &le; &radic;R</code>. So the only primes that could ever mark something
            inside <code>[L, R]</code> as composite are the (comparatively few) primes up to{' '}
            <code>&radic;R</code> &mdash; and there are far fewer of those than there are numbers in{' '}
            <code>[L, R]</code> itself.
          </p>
          <ol className="steps">
            <li>Run the ordinary Sieve of Eratosthenes up to <code>&radic;R</code>, collecting every &quot;base&quot; prime found.</li>
            <li>Allocate a boolean array sized only <code>R - L + 1</code>, representing just the range <code>[L, R]</code>, all initially &quot;possibly prime.&quot;</li>
            <li>For every base prime <code>p</code>, find the first multiple of <code>p</code> that is <code>&ge; L</code>, then cross out every multiple of <code>p</code> from there through <code>R</code>, mapped into the small array&apos;s local indices.</li>
            <li>Whatever survives (excluding <code>0</code> and <code>1</code> themselves, if they fall in range) is prime.</li>
          </ol>
          <div className="recurrence">{`basePrimes = sieve(⌊√R⌋)                    -- small sieve, O(√R) space

inRange = array of true, size R - L + 1        -- index i represents the number L + i

for each base prime p:
    start = max(p * p, ((L + p - 1) / p) * p)    -- first multiple of p that is ≥ L
    for j = start to R step p:
        inRange[j - L] = false

if L ≤ 1: inRange[1 - L] = false (if in range)   -- 0 and 1 are never prime
if L == 0: inRange[0] = false

count = number of true entries in inRange`}</div>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Finding the first multiple of p that&apos;s &ge; L needs care, not <code>p * p</code> alone</div>
          The base sieve&apos;s own inner loop always starts crossing out at <code>p * p</code>, because
          anything smaller was already handled by an even smaller prime. That shortcut does{' '}
          <strong>not</strong> carry over to the segmented range: if <code>L</code> is far larger than{' '}
          <code>p</code>, the first multiple of <code>p</code> that actually falls inside{' '}
          <code>[L, R]</code> could be much smaller than <code>p * p</code>. The correct starting point is{' '}
          <code>max(p * p, the first multiple of p that is &ge; L)</code>, computed with a ceiling
          division: <code>((L + p - 1) / p) * p</code>.
        </div>
      </div>
      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Solution {
    private List<Integer> simpleSieve(int limit) {
        boolean[] isComposite = new boolean[limit + 1];
        List<Integer> primes = new ArrayList<>();

        for (int i = 2; i <= limit; i++) {
            if (!isComposite[i]) {
                primes.add(i);
                for (long j = (long) i * i; j <= limit; j += i) {
                    isComposite[(int) j] = true;
                }
            }
        }
        return primes;
    }

    public int countPrimesInRange(int L, int R) {
        int sqrtR = (int) Math.sqrt((double) R) + 1;
        List<Integer> basePrimes = simpleSieve(sqrtR);

        boolean[] isComposite = new boolean[R - L + 1];

        for (int p : basePrimes) {
            long start = Math.max((long) p * p, ((long) L + p - 1) / p * p);
            for (long j = start; j <= R; j += p) {
                isComposite[(int) (j - L)] = true;
            }
        }

        int count = 0;
        for (int i = 0; i < isComposite.length; i++) {
            long actual = (long) L + i;
            if (!isComposite[i] && actual >= 2) {
                count++;
            }
        }
        return count;
    }
}`}</Code>
      <div className="callout callout-note">
        <div className="callout-title">📌 A prime itself never gets crossed out by this process</div>
        A base prime <code>p</code> only ever crosses out <code>p</code>&apos;s own <strong>multiples</strong>,
        starting at <code>p&sup2;</code> or later &mdash; <code>p</code> itself is smaller than{' '}
        <code>p&sup2;</code> for any <code>p &gt; 1</code>, so it&apos;s never touched by its own pass, nor by any
        smaller prime&apos;s pass (it has no smaller prime factor, by definition). If <code>p</code> itself
        happens to fall inside <code>[L, R]</code>, it survives and is correctly counted.
      </div>
      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time</div>
          <div className="cx-val">O(&radic;R log log &radic;R + (R-L) log log R)</div>
          <div className="cx-note">A small base sieve, plus one marking pass per base prime over the segment.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space</div>
          <div className="cx-val">O(&radic;R + (R - L))</div>
          <div className="cx-note">The base sieve&apos;s own array, plus the segment&apos;s &mdash; never a full R-sized array.</div>
        </div>
      </div>

      {/* 7. Smallest Prime Factor Sieve */}
      <div id="smallest-prime-factor-sieve" data-topic-boundary="true" />
      <p className="page-sub">
        A one-line change to the ordinary sieve turns &quot;is this prime?&quot; into &quot;what&apos;s the <strong>smallest</strong>{' '}
        prime factor of every number up to n?&quot; &mdash; computed once, reused for every query after.
      </p>
      <div className="meta-row">
        <span className="pill">GeeksforGeeks</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">The FIRST prime to reach a number is its smallest factor, by definition</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Given a limit <code>n</code>, precompute an array <code>spf[]</code>{' '}
          where <code>spf[x]</code> is the smallest prime factor of <code>x</code>, for every{' '}
          <code>x</code> from <code>2</code> to <code>n</code>.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Primes are walked in increasing order, so the first one to mark x IS its smallest factor</div>
          <p>
            This is the ordinary Sieve of Eratosthenes, with one change: instead of just flipping a
            boolean, every multiple of a prime <code>i</code> gets <code>i</code> written into its{' '}
            <code>spf[]</code> slot &mdash; but <strong>only if that slot is still empty</strong>. Because{' '}
            <code>i</code> is walked in increasing order, the first prime that ever reaches a given
            multiple is necessarily its smallest prime factor; any later, larger prime that also divides
            the same number is deliberately not allowed to overwrite it.
          </p>
          <div className="recurrence">{`spf = array of 0, size n+1

for i = 2 to n:
    if spf[i] == 0:                      -- i has not been marked yet -> i itself is prime
        for j = i to n step i:
            if spf[j] == 0:                -- don't overwrite an already-found smaller factor
                spf[j] = i`}</div>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ This inner loop starts at <code>i</code>, not <code>i*i</code>, unlike the plain sieve</div>
          The ordinary sieve can safely skip straight to <code>i&sup2;</code>, because anything smaller was
          already proven composite. Here, the goal is different: <code>spf[i]</code> itself (when{' '}
          <code>i</code> is prime) needs to be set to <code>i</code> too, and every multiple of{' '}
          <code>i</code> starting right from <code>i</code> needs a chance to record <code>i</code> as its
          smallest factor if nothing smaller has claimed it yet. Starting at <code>i&sup2;</code> would
          leave <code>spf[i]</code> itself, and several of its smaller multiples, permanently unset.
        </div>
      </div>
      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Solution {
    public int[] smallestPrimeFactorSieve(int n) {
        int[] spf = new int[n + 1];

        for (int i = 2; i <= n; i++) {
            if (spf[i] == 0) {               // i hasn't been claimed yet -- i is prime
                for (int j = i; j <= n; j += i) {
                    if (spf[j] == 0) {
                        spf[j] = i;
                    }
                }
            }
        }
        return spf;
    }
}`}</Code>
      <div className="sub-header">
        <h3>Dry run</h3>
      </div>
      <pre className="diagram">{`  n = 12 ,  spf initially all 0

  i=2 (spf[2]==0, so 2 is prime): mark multiples of 2 that are still unset
      spf[2]=2, spf[4]=2, spf[6]=2, spf[8]=2, spf[10]=2, spf[12]=2

  i=3 (spf[3]==0, so 3 is prime): mark multiples of 3 that are still unset
      spf[3]=3, spf[6] already set -> skip, spf[9]=3, spf[12] already set -> skip

  i=4: spf[4] already set (=2) -> 4 is composite, nothing to do here
  i=5 (spf[5]==0): spf[5]=5, spf[10] already set -> skip
  ... continues ...

  final spf[2..12] = [2,2,3,2,5,2,7,2,3,2,11,2]`}</pre>
      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time</div>
          <div className="cx-val">O(n log log n)</div>
          <div className="cx-note">Same harmonic-sum argument as the ordinary sieve.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space</div>
          <div className="cx-val">O(n)</div>
          <div className="cx-note">One int per number up to n.</div>
        </div>
      </div>

      {/* 8. Prime Factorization Using SPF */}
      <div id="prime-factorization-using-spf" data-topic-boundary="true" />
      <p className="page-sub">
        With every number&apos;s smallest prime factor precomputed, factorizing any single number up to{' '}
        <code>n</code> collapses from <code>O(&radic;x)</code> down to <code>O(log x)</code>.
      </p>
      <div className="meta-row">
        <span className="pill">GeeksforGeeks</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Repeatedly peel off spf[x] and divide</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Given many numbers, each up to some limit <code>n</code>, factorize
          each one into its prime factors &mdash; efficiently, across many repeated queries.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Once SPF is built once, every factorization is just repeated lookups</div>
          <p>
            Prime Factors of a Number factorizes a single <code>n</code> in <code>O(&radic;n)</code>{' '}
            by trial division. That cost is paid again, in full, for <em>every</em> query. Building the
            Smallest Prime Factor sieve once, in <code>O(n log log n)</code>, changes the per-query
            cost entirely: to factorize <code>x</code>, just look up <code>spf[x]</code> (its smallest
            prime factor), record it, divide it out, and repeat on the quotient &mdash; each step is an{' '}
            <code>O(1)</code> array lookup, and there can be at most <code>log&#8322;x</code> steps
            before <code>x</code> is reduced to <code>1</code>.
          </p>
          <div className="recurrence">{`factorize(x, spf):
    factors = []
    while x != 1:
        p = spf[x]
        factors.add(p)
        x = x / p
    return factors`}</div>
        </div>
        <div className="callout callout-note">
          <div className="callout-title">📌 This is exactly where the whole &quot;build a sieve once&quot; family of techniques pays off</div>
          A single factorization using the SPF array costs the same <code>O(&radic;x)</code> trial
          division would for one query &mdash; but across <code>q</code> queries, trial division costs{' '}
          <code>O(q &middot; &radic;n)</code> total, while the sieve approach costs{' '}
          <code>O(n log log n)</code> once plus <code>O(log n)</code> per query. Once <code>q</code> is
          large relative to <code>n</code>, precomputing the sieve wins decisively.
        </div>
      </div>
      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Solution {
    private int[] buildSpf(int n) {
        int[] spf = new int[n + 1];
        for (int i = 2; i <= n; i++) {
            if (spf[i] == 0) {
                for (int j = i; j <= n; j += i) {
                    if (spf[j] == 0) {
                        spf[j] = i;
                    }
                }
            }
        }
        return spf;
    }

    private List<Integer> factorizeUsingSpf(int x, int[] spf) {
        List<Integer> factors = new ArrayList<>();
        while (x != 1) {
            int p = spf[x];
            factors.add(p);
            x /= p;
        }
        return factors;
    }

    public List<List<Integer>> factorizeAll(int[] queries, int n) {
        int[] spf = buildSpf(n);
        List<List<Integer>> results = new ArrayList<>();
        for (int q : queries) {
            results.add(factorizeUsingSpf(q, spf));
        }
        return results;
    }
}`}</Code>
      <div className="sub-header">
        <h3>Dry run</h3>
      </div>
      <pre className="diagram">{`  spf (from the Part 7 dry run) = [_,_,2,3,2,5,2,7,2,3,2,11,2]   (indices 2..12)

  factorize(12):
    spf[12]=2 -> factor 2, x=6
    spf[6]=2  -> factor 2, x=3
    spf[3]=3  -> factor 3, x=1
    stop

  12 = 2 × 2 × 3`}</pre>
      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time</div>
          <div className="cx-val">O(n log log n) once, O(log x) per query</div>
          <div className="cx-note">Building the sieve dominates a single run; each factorization afterward is cheap.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space</div>
          <div className="cx-val">O(n)</div>
          <div className="cx-note">The SPF array itself.</div>
        </div>
      </div>
    </>
  );
}

