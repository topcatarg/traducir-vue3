# traducir-vue3

This is a view in vue for using https://github.com/g3rv4/Traducir. Original web view is in React. 

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
To make this project work, you have to branch traducir, and follow the instructions there to make a working backend. 

## Avoiding CORS issues

You have to add a couple of line in the Configuration method in Traducir. 

Change configure method inside Startup.cs inside Traducir.API to:

    public void Configure(IApplicationBuilder app)
    {
        app.UseCors(builder => builder.AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials()
        #if DEBUG
            .AllowAnyOrigin());
        #else
            .WithOrigins(""));
        #endif
        app.UseAuthentication();
        app.UseMiniProfiler();
        app.UseExceptional();
        app.UseCookiePolicy(new CookiePolicyOptions
        {
            HttpOnly = Microsoft.AspNetCore.CookiePolicy.HttpOnlyPolicy.Always
        });
        app.UseMvc();
    }
    
If you know how to make the proxy work in VUE (like in react), you could help me solving this questions:

https://es.stackoverflow.com/q/189523/324
or this one:
https://stackoverflow.com/q/51968782/73749

## Know issues

This is still a work in progress, so there is a lot of problems around.

- [ ] Errors are disabled until I find a proper way to show them
- [ ] Main grid is not showing urgent items in red
- [ ] When you filter using the button, there is no change in the main filter (partial fixed)
- [ ] My account is empty
- [ ] Users is empty
- [ ] Store is a mess (should break it out in parts)
- [ ] No webworker (I started this before it was implemented on traducir)

And probably, a lot more.
