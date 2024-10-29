          The following code is implemented in node js and javascript using GDB/ windows library to solve the objective function of Lagrangian Curves using Shamshira Secret Sharing Algorithm

          Objective:
          The task is to find the constant term i.e, ‘c’ of the polynomial with the given roots.
          Start the Program 
          
          1. Read the Test Case from a JSON File
          2. Decode the Y Values
          3. Calculate the Constant Term (C)

To solve for the line you want, you really do the "basic" thing you might expect. The formula for a line is f(x)=ax+b

This argument works, but doesn't scale to higher-degree polynomials well. To do this, it helps to know some linear algebra. Specifically, the space of all polynomials of a given degree over a field k
 Pn(k)={∑ni=0aixi∣ai∈k}
 forms a vector space over k
. This vector space is of dimension n+1
. One obvious basis for it is the monomial basis {1,x,…,xn+1} polynomial p(x)=∑ni=0aixi=(a0,…,an)
 (in the monomial basis) to an "evaluation representation" (p(x0),…,p(xn+1))
. Anyway, the general way to reconstruct Shamir's secret sharing is collect enough evaluation points (p(x0),…,p(xn+1)) 
. use the (inverse) vandermonde matrix to change basis to the monomial basis p(x)=∑ni=0aixi
. evaluate p(0)

Let’s say S is the secret that we wish to encode.
1. It is divided into N parts: S1, S2, S3, …., Sn.
2. After dividing it, a number K is chosen by the user in order to decrypt the parts and find the original secret.
3. It is chosen in such a way that if we know less than K parts, then we will not be able to find the secret S (i.e.) the secret S can not be reconstructed with (K – 1) parts or fewer.
4. If we know K or more parts from S1, S2, S3, …., Sn, then we can compute/reconstructed our secret code S easily. This is conventionally called (K, N) threshold scheme.     
                
