import Code from '../../components/Code.jsx';

export default function BitManipulation() {
  return (
    <>
      {/* ── 1. Binary Number Conversion & Bitwise Operators ───────────────── */}
      <div id="binary-number-conversion" data-topic-boundary="true" />
      <p className="page-sub">
        Bit manipulation operates directly on the binary representation of integers stored in registers.
        Mastering bitwise operators provides O(1) operations, ultra-compact memory representation, and elegant algorithmic shortcuts.
      </p>
      <div className="meta-row">
        <span className="pill">Fundamentals</span>
        <span className="pill pill-success">Easy</span>
        <span className="pill">Base-2 &bull; Bitwise AND, OR, XOR, NOT, Shifts</span>
      </div>

      <div className="card">
        <p>
          <strong>Positional Notation &amp; Base Conversion:</strong> Every integer in a digital computer is represented in
          base-2 (binary), where each bit position <code>i</code> (starting from 0 at the least significant bit, LSB) has a
          positional weight of <code>2^i</code>.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">🔑 Decimal to Binary &amp; Binary to Decimal Formulas</div>
          <ul>
            <li>
              <strong>Decimal to Binary:</strong> Repeatedly divide the decimal number <code>n</code> by 2. Collect the
              remainders (<code>n % 2</code>) in reverse order until <code>n == 0</code>.
            </li>
            <li>
              <strong>Binary to Decimal:</strong> Multiply each binary digit <code>b_i</code> by <code>2^i</code> and sum
              the terms: <code>Decimal = &sum; (b_i &times; 2^i)</code>.
            </li>
          </ul>
        </div>

        <pre className="diagram">{`Decimal 13 to Binary Conversion:
  13 / 2 = 6, remainder = 1  (LSB, 2^0)
   6 / 2 = 3, remainder = 0  (2^1)
   3 / 2 = 1, remainder = 1  (2^2)
   1 / 2 = 0, remainder = 1  (MSB, 2^3)
Reading bottom to top: 1101_2 = (1 × 8) + (1 × 4) + (0 × 2) + (1 × 1) = 13`}</pre>

        <div className="sub-header">
          <h3>The Six Fundamental Bitwise Operators in Java</h3>
        </div>

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Operator</th>
                <th>Name</th>
                <th>Rule</th>
                <th>Example (A = 5 [0101], B = 3 [0011])</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>&amp;</code></td>
                <td>Bitwise AND</td>
                <td>1 only if both operand bits are 1; else 0</td>
                <td><code>5 &amp; 3 = 1</code> (<code>0001</code>)</td>
              </tr>
              <tr>
                <td><code>|</code></td>
                <td>Bitwise OR</td>
                <td>1 if at least one operand bit is 1; else 0</td>
                <td><code>5 | 3 = 7</code> (<code>0111</code>)</td>
              </tr>
              <tr>
                <td><code>^</code></td>
                <td>Bitwise XOR</td>
                <td>1 if bits differ; 0 if bits are identical</td>
                <td><code>5 ^ 3 = 6</code> (<code>0110</code>)</td>
              </tr>
              <tr>
                <td><code>~</code></td>
                <td>Bitwise NOT</td>
                <td>Unary inversion: flips every 0 to 1 and 1 to 0</td>
                <td><code>~5 = -6</code> (in two&apos;s complement)</td>
              </tr>
              <tr>
                <td><code>&lt;&lt;</code></td>
                <td>Left Shift</td>
                <td>Shift bits left by <code>k</code>; fills with 0s on right. Equivalent to <code>x &times; 2^k</code></td>
                <td><code>5 &lt;&lt; 1 = 10</code> (<code>1010</code>)</td>
              </tr>
              <tr>
                <td><code>&gt;&gt;</code></td>
                <td>Signed Right Shift</td>
                <td>Shift bits right by <code>k</code>; preserves sign bit (MSB). Equivalent to <code>&lfloor;x / 2^k&rfloor;</code></td>
                <td><code>5 &gt;&gt; 1 = 2</code> (<code>0010</code>)</td>
              </tr>
              <tr>
                <td><code>&gt;&gt;&gt;</code></td>
                <td>Unsigned Right Shift</td>
                <td>Shift bits right by <code>k</code>; fills MSB with 0s regardless of sign</td>
                <td><code>-1 &gt;&gt;&gt; 1 = 2147483647</code> (<code>0x7FFFFFFF</code>)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="sub-header">
        <h3>Java Implementation: Decimal &harr; Binary Conversion</h3>
      </div>
      <Code>{`class Solution {
    /*
     * Converts a positive decimal integer into its binary string representation.
     * Time Complexity: O(log2(n))
     * Space Complexity: O(log2(n)) for StringBuilder
     */
    public String decimalToBinary(int n) {
        if (n == 0) {
            return "0";
        }
        StringBuilder sb = new StringBuilder();
        while (n > 0) {
            sb.append(n % 2);
            n /= 2;
        }
        return sb.reverse().toString();
    }

    /*
     * Converts a binary string into its decimal integer value.
     * Time Complexity: O(length of s)
     * Space Complexity: O(1)
     */
    public int binaryToDecimal(String s) {
        int decimal = 0;
        int powerOfTwo = 1;

        // Process from rightmost (least significant) bit to left
        for (int i = s.length() - 1; i >= 0; i--) {
            if (s.charAt(i) == '1') {
                decimal += powerOfTwo;
            }
            powerOfTwo *= 2;
        }
        return decimal;
    }
}`}</Code>

      {/* ── 2. 1's Complement and 2's Complement ──────────────────────────── */}
      <div id="ones-and-twos-complement" data-topic-boundary="true" />
      <p className="page-sub">
        Modern computers represent signed integers using Two&apos;s Complement. It provides a unique representation for zero
        and allows addition and subtraction hardware to share the exact same circuitry.
      </p>
      <div className="meta-row">
        <span className="pill">Theory &bull; Computer Architecture</span>
        <span className="pill pill-success">Easy</span>
        <span className="pill">~x + 1 &bull; Sign Bit &bull; Integer.MIN_VALUE</span>
      </div>

      <div className="card">
        <p>
          <strong>Why not Sign-Magnitude or 1&apos;s Complement?</strong>
        </p>
        <ul>
          <li>
            <strong>Sign-Magnitude:</strong> Uses the most significant bit (MSB) as a sign flag (<code>0</code> for positive, <code>1</code> for negative).
            Flaw: It produces two representations for zero (<code>+0 = 0000_0000</code> and <code>-0 = 1000_0000</code>) and requires separate logic circuits for subtraction.
          </li>
          <li>
            <strong>1&apos;s Complement:</strong> Inverts all bits (<code>~x</code>). Flaw: Still has dual zero representations (<code>0000</code> and <code>1111</code>) and requires an end-around carry during addition.
          </li>
          <li>
            <strong>2&apos;s Complement:</strong> Formed by taking the 1&apos;s complement and adding 1:
            <div className="callout callout-key">
              <div className="callout-title">🔑 Two&apos;s Complement Rule</div>
              <code>-x = (~x) + 1</code>
            </div>
            Benefits: Exactly one zero (<code>0000_0000</code>), seamless hardware addition, and the MSB directly represents a negative power of 2:
            <code>Value = -b_31 &times; 2^31 + &sum;_{'{'}i=0{'}'}^30 b_i &times; 2^i</code>.
          </li>
        </ul>

        <pre className="diagram">{`Computing -13 in 8-bit Two's Complement:
  +13 in binary:       00001101
  1's Complement (~13):11110010  (invert each bit)
  Add 1:                     +1
  -----------------------------
  -13 in 2's comp:     11110011

Verification:
  MSB (-2^7):         -128
  Bits 6..0:          +64 + 32 + 16 + 2 + 1 = +115
  Total:              -128 + 115 = -13  ✓`}</pre>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ The Integer.MIN_VALUE Asymmetry Gotcha</div>
          <p>
            In 32-bit signed two&apos;s complement, values range from <code>-2,147,483,648</code> (<code>0x80000000</code>) to
            <code>+2,147,483,647</code> (<code>0x7FFFFFFF</code>).
            Because the positive range has one fewer value (due to <code>0</code> occupying the non-negative space),
            negating <code>Integer.MIN_VALUE</code>:
          </p>
          <code>-Integer.MIN_VALUE == Integer.MIN_VALUE</code>
          <p>
            In Java, <code>Math.abs(Integer.MIN_VALUE)</code> returns <code>-2147483648</code>! Always cast to <code>long</code> first when absolute values of arbitrary integers are needed.
          </p>
        </div>
      </div>

      <div className="sub-header">
        <h3>Java Demonstration: Negation via Two&apos;s Complement</h3>
      </div>
      <Code>{`class Solution {
    /*
     * Demonstrates negation using bitwise NOT and adding 1.
     * Guaranteed: (~x + 1) == -x for all 32-bit integers except Integer.MIN_VALUE.
     */
    public int negate(int x) {
        return (~x) + 1;
    }

    /*
     * Converts a 32-bit integer into a complete 32-character binary string,
     * highlighting the sign bit (MSB).
     */
    public String toFullBinary32(int x) {
        StringBuilder sb = new StringBuilder();
        for (int i = 31; i >= 0; i--) {
            int bit = (x >>> i) & 1;
            sb.append(bit);
        }
        return sb.toString();
    }
}`}</Code>

      {/* ── 3. Swap Two Numbers ───────────────────────────────────────────── */}
      <div id="swap-two-numbers" data-topic-boundary="true" />
      <p className="page-sub">
        Swapping two variables in-place without a temporary variable using the self-inverting property of the XOR operator.
      </p>
      <div className="meta-row">
        <span className="pill">Classic Bit Trick</span>
        <span className="pill pill-success">Easy</span>
        <span className="pill">a ^= b &bull; In-place &bull; No Overflow</span>
      </div>

      <div className="card">
        <p>
          <strong>Mathematical Proof of XOR Swap:</strong>
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Core Properties of XOR (Exclusive OR)</div>
          <ol>
            <li><strong>Identity:</strong> <code>x ^ 0 = x</code></li>
            <li><strong>Self-Inverse:</strong> <code>x ^ x = 0</code></li>
            <li><strong>Commutative:</strong> <code>a ^ b = b ^ a</code></li>
            <li><strong>Associative:</strong> <code>(a ^ b) ^ c = a ^ (b ^ c)</code></li>
          </ol>
        </div>

        <pre className="diagram">{`Trace of XOR Swap (Initial: a = X, b = Y):
  Step 1: a = a ^ b;
          a = X ^ Y
          b = Y

  Step 2: b = a ^ b;
          b = (X ^ Y) ^ Y = X ^ (Y ^ Y) = X ^ 0 = X
          b now holds the original value of a!

  Step 3: a = a ^ b;
          a = (X ^ Y) ^ X = (X ^ X) ^ Y = 0 ^ Y = Y
          a now holds the original value of b!
Swap complete without allocating any extra variable or memory.`}</pre>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ The Same Memory Address Bug</div>
          <p>
            If you attempt to swap an element with itself in an array where <code>i == j</code>:
            <code>arr[i] = arr[i] ^ arr[i] = 0</code>.
            The location is immediately zeroed out! Always ensure <code>i != j</code> before executing an XOR swap on array elements.
          </p>
        </div>
      </div>

      <div className="sub-header">
        <h3>Java Implementation: In-Place XOR Swap</h3>
      </div>
      <Code>{`class Solution {
    /*
     * Swaps two elements in an array at indices i and j without a temp variable.
     * Guards against the self-zeroing bug when i == j.
     */
    public void swap(int[] arr, int i, int j) {
        if (i == j) {
            return;
        }
        arr[i] = arr[i] ^ arr[j];
        arr[j] = arr[i] ^ arr[j];
        arr[i] = arr[i] ^ arr[j];
    }
}`}</Code>

      {/* ── 4. Check if ith Bit is Set ────────────────────────────────────── */}
      <div id="check-ith-bit-set" data-topic-boundary="true" />
      <p className="page-sub">
        Testing whether the bit at index <code>i</code> (0-indexed from the right) is 1 or 0 using bit masks and shifts.
      </p>
      <div className="meta-row">
        <span className="pill">Core Primitives</span>
        <span className="pill pill-success">Easy</span>
        <span className="pill">Left Shift Mask &bull; Right Shift Check</span>
      </div>

      <div className="card">
        <div className="callout callout-key">
          <div className="callout-title">🔑 Two Equivalent Approaches</div>
          <ul>
            <li>
              <strong>Approach 1 (Left Shift Mask):</strong> Create a mask with only the <code>i</code>-th bit set: <code>1 &lt;&lt; i</code>.
              AND it with <code>n</code>. If the result is non-zero, the bit is set.
              <br />
              <code>boolean isSet = (n &amp; (1 &lt;&lt; i)) != 0;</code>
            </li>
            <li>
              <strong>Approach 2 (Right Shift):</strong> Shift the <code>i</code>-th bit of <code>n</code> down to position 0, then inspect the LSB:
              <br />
              <code>boolean isSet = ((n &gt;&gt; i) &amp; 1) == 1;</code>
            </li>
          </ul>
        </div>

        <pre className="diagram">{`Checking if 2nd bit is set in n = 13 (binary: 1101):
  i = 2:
  Mask: 1 << 2  = 0100 (4 in decimal)
  1101 & 0100   = 0100 (non-zero => bit 2 is 1 / SET!)

Checking if 1st bit is set in n = 13 (binary: 1101):
  i = 1:
  Mask: 1 << 1  = 0010 (2 in decimal)
  1101 & 0010   = 0000 (zero => bit 1 is 0 / UNSET!)`}</pre>
      </div>

      <div className="sub-header">
        <h3>Java Implementation: Check i-th Bit</h3>
      </div>
      <Code>{`class Solution {
    /*
     * Checks if the i-th bit of n is set using left-shift mask.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    public boolean checkKthBitLeftShift(int n, int i) {
        return (n & (1 << i)) != 0;
    }

    /*
     * Checks if the i-th bit of n is set using right-shift.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    public boolean checkKthBitRightShift(int n, int i) {
        return ((n >> i) & 1) == 1;
    }
}`}</Code>

      {/* ── 5. Extract the ith Bit ────────────────────────────────────────── */}
      <div id="extract-ith-bit" data-topic-boundary="true" />
      <p className="page-sub">
        Extracting the exact numeric value (<code>0</code> or <code>1</code>) of the bit at position <code>i</code>.
      </p>
      <div className="meta-row">
        <span className="pill">Core Primitives</span>
        <span className="pill pill-success">Easy</span>
        <span className="pill">(n &gt;&gt; i) &amp; 1 &bull; Bit Value Extraction</span>
      </div>

      <div className="card">
        <p>
          While checking returns a boolean, extracting requires an integer result (<code>0</code> or <code>1</code>).
          The right-shift approach directly aligns the targeted bit with position 0, allowing an immediate mask with <code>1</code>:
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Extraction Formula</div>
          <code>int bit = (n &gt;&gt; i) &amp; 1;</code>
        </div>
        <p>
          This is especially useful when constructing binary strings, performing polynomial hashes, or translating bit patterns into decision trees.
        </p>
      </div>

      <div className="sub-header">
        <h3>Java Implementation: Extract i-th Bit</h3>
      </div>
      <Code>{`class Solution {
    /*
     * Extracts and returns the i-th bit of n as an int (0 or 1).
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    public int extractBit(int n, int i) {
        return (n >> i) & 1;
    }
}`}</Code>

      {/* ── 6. Set the ith Bit ────────────────────────────────────────────── */}
      <div id="set-ith-bit" data-topic-boundary="true" />
      <p className="page-sub">
        Forcing the bit at index <code>i</code> to 1 while leaving all other bits unaffected using bitwise OR.
      </p>
      <div className="meta-row">
        <span className="pill">Core Primitives</span>
        <span className="pill pill-success">Easy</span>
        <span className="pill">n | (1 &lt;&lt; i) &bull; Masking with OR</span>
      </div>

      <div className="card">
        <p>
          Bitwise OR has the property that <code>x | 1 = 1</code> and <code>x | 0 = x</code>.
          Therefore, OR-ing any number with a mask having <code>1</code> only at index <code>i</code> forces bit <code>i</code> to 1 while preserving all other bits unchanged.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">🔑 Set Bit Formula</div>
          <code>n = n | (1 &lt;&lt; i);</code>
        </div>

        <pre className="diagram">{`Setting 1st bit of n = 9 (binary: 1001, decimal: 9):
  i = 1:
  Mask: 1 << 1  = 0010
  1001 | 0010   = 1011 (11 in decimal)
Bit 1 is now 1, and bits 0, 2, 3 remain intact.`}</pre>
      </div>

      <div className="sub-header">
        <h3>Java Implementation: Set i-th Bit</h3>
      </div>
      <Code>{`class Solution {
    /*
     * Sets the i-th bit of n to 1.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    public int setBit(int n, int i) {
        return n | (1 << i);
    }
}`}</Code>

      {/* ── 7. Clear the ith Bit ──────────────────────────────────────────── */}
      <div id="clear-ith-bit" data-topic-boundary="true" />
      <p className="page-sub">
        Forcing the bit at index <code>i</code> to 0 while leaving all other bits unaffected using bitwise AND with an inverted mask.
      </p>
      <div className="meta-row">
        <span className="pill">Core Primitives</span>
        <span className="pill pill-success">Easy</span>
        <span className="pill">n &amp; ~(1 &lt;&lt; i) &bull; Masking with AND NOT</span>
      </div>

      <div className="card">
        <p>
          Bitwise AND has the property that <code>x &amp; 0 = 0</code> and <code>x &amp; 1 = x</code>.
          To clear only bit <code>i</code>, we need a mask that contains <code>0</code> at position <code>i</code> and <code>1</code> at all other positions.
          This inverted mask is generated by taking the bitwise NOT of <code>(1 &lt;&lt; i)</code>: <code>~(1 &lt;&lt; i)</code>.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">🔑 Clear Bit Formula</div>
          <code>n = n &amp; ~(1 &lt;&lt; i);</code>
        </div>

        <pre className="diagram">{`Clearing 2nd bit of n = 13 (binary: 1101, decimal: 13):
  i = 2:
  1 << 2:          00000100
  ~(1 << 2):       11111011
  1101 & 1011:     1001 (9 in decimal)
Bit 2 is cleared from 1 to 0; all other bits remain unchanged.`}</pre>
      </div>

      <div className="sub-header">
        <h3>Java Implementation: Clear i-th Bit</h3>
      </div>
      <Code>{`class Solution {
    /*
     * Clears (unsets) the i-th bit of n to 0.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    public int clearBit(int n, int i) {
        return n & ~(1 << i);
    }
}`}</Code>

      {/* ── 8. Toggle the ith Bit ─────────────────────────────────────────── */}
      <div id="toggle-ith-bit" data-topic-boundary="true" />
      <p className="page-sub">
        Inverting the bit at index <code>i</code> (0 becomes 1, 1 becomes 0) using bitwise XOR.
      </p>
      <div className="meta-row">
        <span className="pill">Core Primitives</span>
        <span className="pill pill-success">Easy</span>
        <span className="pill">n ^ (1 &lt;&lt; i) &bull; Inversion with XOR</span>
      </div>

      <div className="card">
        <p>
          Since <code>0 ^ 1 = 1</code> and <code>1 ^ 1 = 0</code>, XOR-ing any bit with 1 flips its value.
          Meanwhile, <code>x ^ 0 = x</code>, so XOR-ing with 0 keeps all other bits completely unchanged.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">🔑 Toggle Bit Formula</div>
          <code>n = n ^ (1 &lt;&lt; i);</code>
        </div>

        <pre className="diagram">{`Toggling 1st bit of n = 13 (binary: 1101):
  i = 1 (currently 0):
  1 << 1:          0010
  1101 ^ 0010:     1111 (15 in decimal)  -> bit 1 flipped to 1!

Toggling 1st bit of n = 15 (binary: 1111):
  i = 1 (currently 1):
  1111 ^ 0010:     1101 (13 in decimal)  -> bit 1 flipped back to 0!`}</pre>
      </div>

      <div className="sub-header">
        <h3>Java Implementation: Toggle i-th Bit</h3>
      </div>
      <Code>{`class Solution {
    /*
     * Toggles the i-th bit of n (0 -> 1 or 1 -> 0).
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    public int toggleBit(int n, int i) {
        return n ^ (1 << i);
    }
}`}</Code>

      {/* ── 9. Remove the Last Set Bit (Rightmost) ────────────────────────── */}
      <div id="remove-last-set-bit" data-topic-boundary="true" />
      <p className="page-sub">
        Turning off the lowest (rightmost) set bit of an integer in a single O(1) operation using the famous <code>n &amp; (n - 1)</code> trick.
      </p>
      <div className="meta-row">
        <span className="pill">Legendary Bit Trick</span>
        <span className="pill pill-success">Easy</span>
        <span className="pill">n &amp; (n - 1) &bull; Rightmost Set Bit Clearance</span>
      </div>

      <div className="card">
        <p>
          <strong>Why does <code>n &amp; (n - 1)</code> clear the rightmost set bit?</strong>
        </p>
        <p>
          Consider the structure of any positive integer <code>n</code> in binary. It consists of three parts:
        </p>
        <code>n = [higher bits] 1 00...00</code>
        <p>
          When you subtract 1 from <code>n</code> to get <code>n - 1</code>, borrowing propagates up to that exact lowest set bit:
        </p>
        <code>n - 1 = [higher bits] 0 11...11</code>
        <ul>
          <li>The higher bits to the left are completely unaffected.</li>
          <li>The rightmost <code>1</code> turns into <code>0</code>.</li>
          <li>All trailing <code>0</code>s to the right turn into <code>1</code>s.</li>
        </ul>
        <p>
          When we perform bitwise AND (<code>n &amp; (n - 1)</code>):
        </p>
        <ul>
          <li><code>[higher bits] &amp; [higher bits]</code> remain identical.</li>
          <li>The rightmost bit: <code>1 &amp; 0 = 0</code>.</li>
          <li>The trailing bits: <code>0 &amp; 1 = 0</code>.</li>
        </ul>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Result of n &amp; (n - 1)</div>
          The rightmost set bit is stripped away, and all other bits remain identical!
        </div>

        <pre className="diagram">{`Example with n = 12 (binary: 1100):
  n:       1 1 0 0  (rightmost set bit is at index 2)
  n - 1:   1 0 1 1  (index 2 becomes 0; trailing zeros become 1s)
  ----------------
  n & (n-1):1 0 0 0  (8 in decimal)
  The lowest set bit at index 2 has been cleared!`}</pre>
      </div>

      <div className="sub-header">
        <h3>Java Implementation: Remove Last Set Bit</h3>
      </div>
      <Code>{`class Solution {
    /*
     * Clears the lowest (rightmost) set bit of n.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    public int removeRightmostSetBit(int n) {
        return n & (n - 1);
    }

    /*
     * Isolates only the lowest set bit (leaves all other bits as 0).
     * Based on two's complement: -n = (~n) + 1.
     * Time Complexity: O(1)
     */
    public int isolateRightmostSetBit(int n) {
        return n & (-n);
    }
}`}</Code>

      {/* ── 10. Count the Number of Set Bits ──────────────────────────────── */}
      <div id="count-set-bits" data-topic-boundary="true" />
      <p className="page-sub">
        Computing the Hamming Weight (total number of 1s in binary representation) using Brian Kernighan&apos;s algorithm in O(set bits) time.
      </p>
      <div className="meta-row">
        <span className="pill">Hamming Weight</span>
        <span className="pill pill-success">Easy</span>
        <span className="pill">Brian Kernighan &bull; Integer.bitCount</span>
      </div>

      <div className="card">
        <p>
          <strong>Naive vs. Brian Kernighan&apos;s Algorithm:</strong>
        </p>
        <ul>
          <li>
            <strong>Naive Approach:</strong> Loop 32 times, shifting <code>n &gt;&gt;&gt; 1</code> and testing <code>n &amp; 1</code>. Always takes 32 iterations regardless of how few bits are set.
          </li>
          <li>
            <strong>Brian Kernighan&apos;s Algorithm:</strong> In each iteration, execute <code>n = n &amp; (n - 1)</code>. Since each execution clears exactly one set bit, the loop runs exactly as many times as there are <code>1</code>s in <code>n</code>!
          </li>
        </ul>

        <div className="callout callout-tip">
          <div className="callout-title">💡 Performance Comparison</div>
          For a number like <code>n = 1024</code> (which is <code>2^10</code>), the naive loop runs 32 times, while Brian Kernighan&apos;s algorithm runs in exactly <strong>1 iteration</strong>!
        </div>
      </div>

      <div className="sub-header">
        <h3>Java Implementation: Brian Kernighan&apos;s Algorithm</h3>
      </div>
      <Code>{`class Solution {
    /*
     * Counts set bits using Brian Kernighan's algorithm.
     * Time Complexity: O(number of set bits) <= O(32)
     * Space Complexity: O(1)
     */
    public int countSetBits(int n) {
        int count = 0;
        while (n != 0) {
            n = n & (n - 1); // Clears the lowest set bit
            count++;
        }
        return count;
    }

    /*
     * Built-in hardware-accelerated Hamming weight in Java.
     * Uses parallel bit counting (SWAR algorithm) in O(1) cycles.
     */
    public int countSetBitsBuiltIn(int n) {
        return Integer.bitCount(n);
    }
}`}</Code>

      {/* ── 11. Check if Number is Power of Two ──────────────────────────── */}
      <div id="power-of-two" data-topic-boundary="true" />
      <p className="page-sub">
        Determining if a given integer is a power of two in O(1) time by leveraging single-set-bit properties.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 231</span>
        <span className="pill pill-success">Easy</span>
        <span className="pill">n &gt; 0 &amp;&amp; (n &amp; (n - 1)) == 0</span>
      </div>

      <div className="card">
        <p>
          <strong>Property of Powers of Two:</strong>
          Any positive integer that is a power of two (<code>2^0 = 1, 2^1 = 2, 2^2 = 4, 2^3 = 8, 2^4 = 16...</code>) has
          <strong>exactly one set bit</strong> in its binary representation.
        </p>

        <pre className="diagram">{`1  = 00000001
2  = 00000010
4  = 00000100
8  = 00001000
16 = 00010000`}</pre>

        <p>
          If a number has exactly one set bit, clearing that lowest set bit using <code>n &amp; (n - 1)</code> must leave <strong>0</strong>!
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Edge Cases: 0 and Negative Numbers</div>
          <ul>
            <li><code>n = 0</code>: <code>0 &amp; -1 = 0</code>, but 0 is NOT a power of 2.</li>
            <li><code>n &lt; 0</code>: In two&apos;s complement, <code>Integer.MIN_VALUE = 0x80000000</code>. Notice <code>MIN_VALUE &amp; (MIN_VALUE - 1) == 0</code> due to signed overflow! But negative numbers cannot be powers of two.</li>
          </ul>
          Hence the check must strictly require: <code>n &gt; 0 &amp;&amp; (n &amp; (n - 1)) == 0</code>.
        </div>
      </div>

      <div className="sub-header">
        <h3>Java Implementation: Power of Two Check</h3>
      </div>
      <Code>{`class Solution {
    /*
     * Checks if n is a power of two.
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    public boolean isPowerOfTwo(int n) {
        return n > 0 && (n & (n - 1)) == 0;
    }
}`}</Code>

      {/* ── 12. Minimum Bit Flips to Convert Number ───────────────────────── */}
      <div id="min-bit-flips-to-convert" data-topic-boundary="true" />
      <p className="page-sub">
        Finding the minimum number of bit flips to transform integer <code>start</code> into integer <code>goal</code> (Hamming Distance).
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 2220</span>
        <span className="pill pill-success">Easy</span>
        <span className="pill">start ^ goal &bull; Hamming Distance</span>
      </div>

      <div className="card">
        <p>
          <strong>Intuition:</strong> A bit at index <code>i</code> needs to be flipped if and only if <code>start</code> and <code>goal</code> differ at that index.
          The XOR operator (<code>^</code>) outputs 1 precisely when two bits differ, and 0 when they match.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">🔑 Two-Step Solution</div>
          <ol>
            <li>Compute the difference mask: <code>int diff = start ^ goal;</code></li>
            <li>Count the number of set bits in <code>diff</code> using Brian Kernighan&apos;s algorithm.</li>
          </ol>
        </div>

        <pre className="diagram">{`start = 10 (1010_2)
goal  = 7  (0111_2)

XOR (differing bits):
  1 0 1 0
^ 0 1 1 1
---------
  1 1 0 1  (diff = 13)

Count set bits in 1101_2:
  Bit 0 is 1 (differed: 0 vs 1)
  Bit 2 is 1 (differed: 0 vs 1)
  Bit 3 is 1 (differed: 1 vs 0)
Total flips needed = 3.`}</pre>
      </div>

      <div className="sub-header">
        <h3>Java Implementation: Min Bit Flips</h3>
      </div>
      <Code>{`class Solution {
    /*
     * Calculates the minimum number of bit flips to convert start to goal.
     * Time Complexity: O(number of flipped bits) <= O(32) = O(1)
     * Space Complexity: O(1)
     */
    public int minBitFlips(int start, int goal) {
        int diff = start ^ goal;
        int flips = 0;

        while (diff != 0) {
            diff = diff & (diff - 1);
            flips++;
        }

        return flips;
    }
}`}</Code>

      {/* ── 13. Power Set using Bit Manipulation ──────────────────────────── */}
      <div id="power-set-bit-manipulation" data-topic-boundary="true" />
      <p className="page-sub">
        Generating all 2^n subsets of a collection by mapping each subset to an n-bit binary mask.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 78</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Bitmask Subsets &bull; 1 &lt;&lt; n</span>
      </div>

      <div className="card">
        <p>
          <strong>Binary Mask to Subset Mapping:</strong> An array of length <code>n</code> has exactly <code>2^n</code> distinct subsets (including the empty set).
          We can iterate an integer <code>mask</code> from <code>0</code> to <code>(1 &lt;&lt; n) - 1</code>:
        </p>
        <ul>
          <li>If the <code>j</code>-th bit of <code>mask</code> is 1 (<code>(mask &amp; (1 &lt;&lt; j)) != 0</code>), include <code>nums[j]</code> in the subset.</li>
          <li>If the <code>j</code>-th bit of <code>mask</code> is 0, exclude <code>nums[j]</code>.</li>
        </ul>

        <pre className="diagram">{`Given nums = [1, 2, 3], n = 3, Total Subsets = 2^3 = 8:

Mask (dec)  Binary (b2 b1 b0)   Included Elements   Subset
0           0 0 0               None                []
1           0 0 1               nums[0]             [1]
2           0 1 0               nums[1]             [2]
3           0 1 1               nums[0], nums[1]    [1, 2]
4           1 0 0               nums[2]             [3]
5           1 0 1               nums[0], nums[2]    [1, 3]
6           1 1 0               nums[1], nums[2]    [2, 3]
7           1 1 1               nums[0..2]          [1, 2, 3]`}</pre>

        <div className="callout callout-tip">
          <div className="callout-title">💡 Bitmask vs. Recursive Backtracking</div>
          <p>
            The bitmask technique is iterative, non-recursive, and naturally orders subsets lexicographically by binary index.
            It is ideal when <code>n &le; 20</code> (since <code>2^20 &approx; 10^6</code> operations, easily fitting in standard 1-second limits).
          </p>
        </div>
      </div>

      <div className="sub-header">
        <h3>Java Implementation: Power Set via Bitmask</h3>
      </div>
      <Code>{`class Solution {
    /*
     * Generates all subsets of nums using bit manipulation.
     * Time Complexity: O(n * 2^n)
     * Space Complexity: O(n * 2^n) to store the result
     */
    public List<List<Integer>> subsets(int[] nums) {
        int n = nums.length;
        int totalSubsets = 1 << n; // 2^n
        List<List<Integer>> result = new ArrayList<>();

        for (int mask = 0; mask < totalSubsets; mask++) {
            List<Integer> currentSubset = new ArrayList<>();
            for (int j = 0; j < n; j++) {
                // If j-th bit of mask is set, include nums[j]
                if ((mask & (1 << j)) != 0) {
                    currentSubset.add(nums[j]);
                }
            }
            result.add(currentSubset);
        }

        return result;
    }
}`}</Code>

      {/* ── 14. Single Number - 1 ─────────────────────────────────────────── */}
      <div id="single-number-i" data-topic-boundary="true" />
      <p className="page-sub">
        Given a non-empty array where every element appears twice except for one unique element, find that unique element in O(N) time and O(1) space.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 136</span>
        <span className="pill pill-success">Easy</span>
        <span className="pill">XOR Accumulator &bull; a ^ a = 0</span>
      </div>

      <div className="card">
        <p>
          <strong>XOR Pair Cancellation:</strong>
          Because XOR is commutative (<code>a ^ b = b ^ a</code>) and associative (<code>(a ^ b) ^ c = a ^ (b ^ c)</code>), the order in which elements are XORed does not matter.
          Any element paired with an identical copy cancels out to 0:
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Algebraic Reduction</div>
          <code>(x_1 ^ x_1) ^ (x_2 ^ x_2) ^ ... ^ (x_k ^ x_k) ^ Unique = 0 ^ 0 ^ ... ^ 0 ^ Unique = Unique</code>
        </div>
      </div>

      <div className="sub-header">
        <h3>Java Implementation: Single Number I</h3>
      </div>
      <Code>{`class Solution {
    /*
     * Finds the element that appears once where all other elements appear twice.
     * Time Complexity: O(N)
     * Space Complexity: O(1)
     */
    public int singleNumber(int[] arr) {
        /*
         * Starting with 0 keeps the first value unchanged
         * because 0 ^ x = x.
         */
        int result = 0;

        /*
         * Equal values cancel under XOR, so every repeated
         * pair disappears from the cumulative result.
         */
        for (int num : arr) {
            result ^= num;
        }

        /*
         * Only the element without a matching pair
         * remains after the complete traversal.
         */
        return result;
    }
}`}</Code>

      {/* ── 15. Single Number - 2 ─────────────────────────────────────────── */}
      <div id="single-number-ii" data-topic-boundary="true" />
      <p className="page-sub">
        Given an integer array where every element appears three times except for one unique element, find that unique element using bit counting or finite-state machines.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 137</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Modulo 3 Bit Count &bull; State Machine (ones, twos)</span>
      </div>

      <div className="card">
        <p>
          <strong>Method 1: Bit Counting (Modulo 3)</strong>
        </p>
        <p>
          Iterate through all 32 bits of an integer. For bit position <code>i</code>, count how many numbers in the array have that bit set:
        </p>
        <ul>
          <li>If the unique number has bit <code>i = 0</code>, all contributors to bit <code>i</code> come from triplets, so <code>sum % 3 == 0</code>.</li>
          <li>If the unique number has bit <code>i = 1</code>, the total count is <code>3k + 1</code>, so <code>sum % 3 == 1</code>.</li>
        </ul>

        <div className="callout callout-tip">
          <div className="callout-title">💡 Method 2: O(N) Single-Pass State Machine</div>
          <p>
            We can track bit counts modulo 3 using two 32-bit registers, <code>ones</code> and <code>twos</code>:
          </p>
          <ul>
            <li><code>ones</code>: tracks bits seen <code>1</code> or <code>4</code> or <code>7</code> times (1 mod 3).</li>
            <li><code>twos</code>: tracks bits seen <code>2</code> or <code>5</code> or <code>8</code> times (2 mod 3).</li>
            <li>When a bit is seen for the 3rd time, both <code>ones</code> and <code>twos</code> reset to 0!</li>
          </ul>
        </div>
      </div>

      <div className="sub-header">
        <h3>Java Implementation: Single Number II</h3>
      </div>
      <Code>{`class Solution {
    /*
     * Approach 1: Bit Counting across all 32 bit positions.
     * Time Complexity: O(32 * N) = O(N)
     * Space Complexity: O(1)
     */
    public int singleNumberBitCounting(int[] nums) {
        int result = 0;

        // Iterate through all 32 bits of an integer
        for (int i = 0; i < 32; i++) {
            int sum = 0;

            // Count how many numbers have the i-th bit set
            for (int num : nums) {
                if (((num >> i) & 1) == 1) {
                    sum++;
                }
            }

            // If the sum is not a multiple of 3, the unique number has this bit set
            if (sum % 3 != 0) {
                result = result | (1 << i);
            }
        }

        return result;
    }

    /*
     * Approach 2: Optimal Bitwise State Machine.
     * Time Complexity: O(N) single-pass
     * Space Complexity: O(1)
     */
    public int singleNumberOptimal(int[] nums) {
        int ones = 0;
        int twos = 0;

        for (int num : nums) {
            // Add num to 'ones' only if it's not already in 'twos'
            ones = (ones ^ num) & ~twos;
            // Add num to 'twos' only if it's no longer in 'ones'
            twos = (twos ^ num) & ~ones;
        }

        return ones;
    }
}`}</Code>

      {/* ── 16. Single Number - 3 ─────────────────────────────────────────── */}
      <div id="single-number-iii" data-topic-boundary="true" />
      <p className="page-sub">
        Given an array where exactly two elements appear once and all others appear twice, isolate both unique numbers in O(N) time and O(1) space.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 260</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Two-Group Partitioning &bull; Lowest Differing Bit</span>
      </div>

      <div className="card">
        <p>
          <strong>Two-Bucket Partitioning via Lowest Set Bit:</strong>
        </p>
        <ol>
          <li>
            <strong>XOR the entire array:</strong> All duplicate pairs cancel out, leaving:
            <code>xorResult = u_1 ^ u_2</code> (where <code>u_1</code> and <code>u_2</code> are the two unique elements).
          </li>
          <li>
            <strong>Isolate a bit where u_1 and u_2 differ:</strong> Since <code>u_1 != u_2</code>, <code>xorResult != 0</code>.
            At least one bit in <code>xorResult</code> must be 1. We isolate the lowest set bit using:
            <code>int mask = xorResult &amp; -xorResult;</code>
          </li>
          <li>
            <strong>Partition elements into two groups:</strong>
            <ul>
              <li><strong>Group 1:</strong> Numbers with that bit set (<code>(num &amp; mask) != 0</code>).</li>
              <li><strong>Group 2:</strong> Numbers with that bit unset (<code>(num &amp; mask) == 0</code>).</li>
            </ul>
          </li>
          <li>
            <strong>XOR each group independently:</strong> Since identical elements have the exact same bits, both copies of any pair fall into the same group and cancel out.
            <code>u_1</code> falls into one group, and <code>u_2</code> falls into the other!
          </li>
        </ol>
      </div>

      <div className="sub-header">
        <h3>Java Implementation: Single Number III</h3>
      </div>
      <Code>{`class Solution {
    /*
     * Finds the two unique elements in an array where all other elements appear twice.
     * Time Complexity: O(N)
     * Space Complexity: O(1)
     */
    public int[] singleNumber(int[] arr) {
        int xorResult = 0;

        /*
         * Duplicate pairs cancel, leaving the XOR
         * of the two values that appear only once.
         */
        for (int num : arr) {
            xorResult ^= num;
        }

        /*
         * Isolate one bit where the two unique values differ.
         * This also works when the differing bit is the sign bit.
         * Note: In Java, (xorResult & -xorResult) safely isolates the lowest set bit.
         */
        int mask = xorResult & -xorResult;

        int group1 = 0;
        int group2 = 0;

        /*
         * Equal values always enter the same group,
         * while the two unique values enter different groups.
         */
        for (int num : arr) {
            if ((num & mask) != 0) {
                group1 ^= num;
            } else {
                group2 ^= num;
            }
        }

        return new int[]{group1, group2};
    }
}`}</Code>

      {/* ── 17. XOR of Numbers in a Range L to R ──────────────────────────── */}
      <div id="xor-range-l-to-r" data-topic-boundary="true" />
      <p className="page-sub">
        Computing the cumulative XOR of all integers from L to R in O(1) time using the 4-case periodic pattern of consecutive XORs.
      </p>
      <div className="meta-row">
        <span className="pill">Pattern &bull; Prefix XOR</span>
        <span className="pill pill-success">Easy</span>
        <span className="pill">4-Cycle Modulo Pattern &bull; O(1) Time</span>
      </div>

      <div className="card">
        <p>
          <strong>The 4-Case Periodic Pattern of Prefix XOR (from 0 to n):</strong>
        </p>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>n</th>
                <th>Binary</th>
                <th>Cumulative XOR (0 ^ ... ^ n)</th>
                <th>Pattern (n % 4)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>0</td><td>0000</td><td>0</td><td><code>n % 4 == 0 &rarr; n</code></td></tr>
              <tr><td>1</td><td>0001</td><td>0 ^ 1 = 1</td><td><code>n % 4 == 1 &rarr; 1</code></td></tr>
              <tr><td>2</td><td>0010</td><td>1 ^ 2 = 3</td><td><code>n % 4 == 2 &rarr; n + 1</code></td></tr>
              <tr><td>3</td><td>0011</td><td>3 ^ 3 = 0</td><td><code>n % 4 == 3 &rarr; 0</code></td></tr>
              <tr><td>4</td><td>0100</td><td>0 ^ 4 = 4</td><td><code>n % 4 == 0 &rarr; n</code></td></tr>
              <tr><td>5</td><td>0101</td><td>4 ^ 5 = 1</td><td><code>n % 4 == 1 &rarr; 1</code></td></tr>
              <tr><td>6</td><td>0110</td><td>1 ^ 6 = 7</td><td><code>n % 4 == 2 &rarr; n + 1</code></td></tr>
              <tr><td>7</td><td>0111</td><td>7 ^ 7 = 0</td><td><code>n % 4 == 3 &rarr; 0</code></td></tr>
            </tbody>
          </table>
        </div>

        <div className="callout callout-key">
          <div className="callout-title">🔑 Why Every 4 Consecutive Numbers XOR to 0</div>
          <p>
            Consider any block <code>[4k, 4k+1, 4k+2, 4k+3]</code>.
            <code>(4k) ^ (4k + 1) = 1</code> (they differ only in the LSB).
            <code>(4k + 2) ^ (4k + 3) = 1</code> (they differ only in the LSB).
            Then: <code>1 ^ 1 = 0</code>!
            Every group of 4 numbers completely cancels itself out!
          </p>
        </div>

        <p>
          <strong>Range XOR Formula:</strong>
          Since XOR is its own inverse, the XOR of all numbers in <code>[L, R]</code> is:
          <code>XOR(L ... R) = prefixXOR(R) ^ prefixXOR(L - 1)</code>
        </p>
      </div>

      <div className="sub-header">
        <h3>Java Implementation: Range XOR in O(1)</h3>
      </div>
      <Code>{`class Solution {
    /*
     * Calculates XOR from 0 through n in O(1) time using the 4-case periodic cycle.
     */
    private long prefixXOR(long n) {
        /*
         * This represents an empty prefix and also allows
         * the same range formula to work when L is 0.
         */
        if (n < 0) {
            return 0;
        }

        long remainder = n % 4;

        /*
         * XOR from 0 through n follows a four-case pattern,
         * so only n % 4 is needed to determine the result.
         */
        if (remainder == 0) {
            return n;
        }
        if (remainder == 1) {
            return 1;
        }
        if (remainder == 2) {
            return n + 1;
        }
        return 0; // remainder == 3
    }

    /*
     * Computes the XOR sum of all integers in range [L, R].
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    public long findRangeXOR(long L, long R) {
        if (L > R) {
            return 0;
        }

        /*
         * The common prefix from 0 through L - 1
         * cancels because XOR is its own inverse.
         */
        return prefixXOR(R) ^ prefixXOR(L - 1);
    }
}`}</Code>

      {/* ── 18. Divide Two Integers Without / * % ─────────────────────────── */}
      <div id="divide-two-integers" data-topic-boundary="true" />
      <p className="page-sub">
        Dividing two 32-bit signed integers without multiplication, division, or modulo by using binary exponentiation and bit shifts.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 29</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Bit Shifting &bull; Binary Long Division &bull; Overflow</span>
      </div>

      <div className="card">
        <p>
          <strong>Binary Long Division Principle:</strong>
          Any quotient <code>Q</code> can be expressed in base-2:
          <code>Q = &sum; b_i &times; 2^i</code>.
          Instead of subtracting the divisor one by one (which is O(dividend) and TLEs on <code>2^31 - 1</code>),
          we find the largest power of two <code>shift</code> such that <code>(divisor &times; 2^shift) &le; dividend</code>,
          subtract it, add <code>2^shift</code> to our quotient, and repeat!
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ 32-Bit Overflow Edge Cases</div>
          <ul>
            <li>
              <strong>Integer.MIN_VALUE / -1:</strong> <code>-2,147,483,648 / -1 = +2,147,483,648</code>.
              This exceeds <code>Integer.MAX_VALUE</code> (<code>2,147,483,647</code>). The problem mandates returning <code>Integer.MAX_VALUE</code>.
            </li>
            <li>
              <strong>Negative Numbers:</strong> Determine the result sign upfront using <code>(dividend &lt; 0) ^ (divisor &lt; 0)</code>,
              then convert both numbers to <code>long</code> before taking <code>Math.abs</code> to avoid 32-bit overflow on <code>Integer.MIN_VALUE</code>.
            </li>
          </ul>
        </div>
      </div>

      <div className="sub-header">
        <h3>Java Implementation: Divide Two Integers</h3>
      </div>
      <Code>{`class Solution {
    /*
     * Divides two integers without using multiplication, division, or modulo operators.
     * Time Complexity: O((log(dividend))^2) or O(32) bit shifts
     * Space Complexity: O(1)
     */
    public int divide(int dividend, int divisor) {
        // Overflow edge case: Integer.MIN_VALUE / -1 exceeds Integer.MAX_VALUE
        if (dividend == Integer.MIN_VALUE && divisor == -1) {
            return Integer.MAX_VALUE;
        }

        boolean negative = (dividend < 0) ^ (divisor < 0);

        /*
         * Wider positive magnitudes safely handle
         * Integer.MIN_VALUE and the required shifts.
         */
        long dividendAbs = Math.abs((long) dividend);
        long divisorAbs = Math.abs((long) divisor);
        long quotient = 0;

        /*
         * Process larger powers of two first so the
         * quotient is built from its most significant bits.
         */
        for (int shift = 31; shift >= 0; shift--) {
            long chunk = divisorAbs << shift;
            if (chunk <= dividendAbs) {
                dividendAbs -= chunk;
                /*
                 * The accepted chunk represents divisor * 2^shift,
                 * so add that power of two to the quotient.
                 */
                quotient += 1L << shift;
            }
        }

        long result = negative ? -quotient : quotient;

        if (result > Integer.MAX_VALUE) {
            return Integer.MAX_VALUE;
        }
        if (result < Integer.MIN_VALUE) {
            return Integer.MIN_VALUE;
        }
        return (int) result;
    }
}`}</Code>

      {/* ── 19. Find Repeating and Missing Number ─────────────────────────── */}
      <div id="find-repeating-and-missing-number" data-topic-boundary="true" />
      <p className="page-sub">
        Given an array of size n containing numbers from 1 to n where one number is repeating and one is missing, find both in O(N) time and O(1) space using XOR partitioning.
      </p>
      <div className="meta-row">
        <span className="pill">Striver 180 &bull; Interview Classic</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">XOR Partitioning &bull; Math vs. Bit Trick</span>
      </div>

      <div className="card">
        <p>
          <strong>Problem:</strong> Given an array <code>arr</code> of size <code>n</code> with numbers from <code>1</code> to <code>n</code>.
          One number <code>A</code> appears twice, and one number <code>B</code> is missing. Find <code>A</code> and <code>B</code> without extra memory.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">🔑 The XOR Reduction Strategy</div>
          <ol>
            <li>
              XOR all elements in the array: <code>arr[0] ^ arr[1] ^ ... ^ arr[n-1]</code>.
            </li>
            <li>
              XOR all numbers from <code>1</code> to <code>n</code>: <code>1 ^ 2 ^ ... ^ n</code>.
            </li>
            <li>
              Combine both: All numbers appearing once in <code>arr</code> and once in <code>1..n</code> appear twice overall and cancel out!
              The repeating number <code>A</code> appears 3 times (2 in arr + 1 in 1..n), and the missing number <code>B</code> appears 1 time (0 in arr + 1 in 1..n).
              <br />
              <code>xorAll = A ^ B</code>.
            </li>
            <li>
              Find the lowest differing bit: <code>int mask = xorAll &amp; -xorAll;</code>.
            </li>
            <li>
              Divide all array elements AND all numbers from <code>1</code> to <code>n</code> into two groups based on whether that bit is set.
              XORing each group isolates <code>A</code> and <code>B</code>!
            </li>
            <li>
              Do a quick linear scan to determine which one is repeating in <code>arr</code>.
            </li>
          </ol>
        </div>
      </div>

      <div className="sub-header">
        <h3>Java Implementation: Find Repeating and Missing Number</h3>
      </div>
      <Code>{`class Solution {
    /*
     * Finds the repeating (A) and missing (B) numbers from 1 to n.
     * Time Complexity: O(N)
     * Space Complexity: O(1)
     */
    public int[] findMissingAndRepeating(int[] arr) {
        int n = arr.length;
        int xorAll = 0;

        // Step 1: XOR all array elements
        for (int num : arr) {
            xorAll ^= num;
        }

        // Step 2: XOR all numbers from 1 to n
        for (int i = 1; i <= n; i++) {
            xorAll ^= i;
        }

        // xorAll now equals (repeating ^ missing)
        // Isolate the lowest set bit
        int mask = xorAll & -xorAll;

        int bucket1 = 0;
        int bucket2 = 0;

        // Partition array elements
        for (int num : arr) {
            if ((num & mask) != 0) {
                bucket1 ^= num;
            } else {
                bucket2 ^= num;
            }
        }

        // Partition numbers 1 to n
        for (int i = 1; i <= n; i++) {
            if ((i & mask) != 0) {
                bucket1 ^= i;
            } else {
                bucket2 ^= i;
            }
        }

        // Determine which bucket is repeating and which is missing
        int repeating = -1;
        int missing = -1;
        for (int num : arr) {
            if (num == bucket1) {
                repeating = bucket1;
                missing = bucket2;
                break;
            }
        }
        if (repeating == -1) {
            repeating = bucket2;
            missing = bucket1;
        }

        return new int[]{repeating, missing};
    }
}`}</Code>
    </>
  );
}
