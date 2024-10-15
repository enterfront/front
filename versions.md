# Instruction to create tags and versions

```
npm version <type>
```

Here <type> can be:
- `patch` - the smallest update, 1.2.3 -> 1.2.**4**
- `minor` - 1.**2**.3 -> 1.**3**.0
- `major` - the greatest, **1**.2.3 -> **2**.0.0

To submit tag (previous command is treated as a commit):
```
git push --tags
```

The version in `package.json` will be updated automatically\
After that add new version to *brojs-admin*
